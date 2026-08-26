"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "./home.module.css";

const ROLES = [
  "Backend Engineer",
  "Open Source Contributor",
  "Full Stack Developer",
  "Problem Solver",
];

const CELL_LEVELS = [0, 0, 0, 1, 1, 2];
const COLS = 56;
const ROWS = 6;
const SCALE = 10;
const HERO_TEXT = "UMANGKHEMKA";

export default function HomePage() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [roleFade, setRoleFade] = useState(true);
  const contributionsRef = useRef<HTMLDivElement>(null);
  const ghCardRef = useRef<HTMLDivElement>(null);
  const revealRef = useRef<HTMLElement | null>(null);
  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  /* Role rotator */
  useEffect(() => {
    const id = setInterval(() => {
      setRoleFade(false);
      setTimeout(() => {
        setRoleIndex((i) => (i + 1) % ROLES.length);
        setRoleFade(true);
      }, 180);
    }, 2600);
    return () => clearInterval(id);
  }, []);
  /* Scroll reveal */
  useEffect(() => {
    const elements = document.querySelectorAll(".scroll-reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -70px 0px",
      }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  /* Inject hero keyframes once */
  useEffect(() => {
    const id = "hero-keyframes";
    if (document.getElementById(id)) return;
    const style = document.createElement("style");
    style.id = id;
    style.textContent = `
      @keyframes heroFadeUp {
        from { opacity: 0; transform: translateY(28px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      .hero-anim {
        opacity: 0;
        animation: heroFadeUp 0.65s cubic-bezier(0.22, 1, 0.36, 1) forwards;
      }
      @keyframes cellPulse {
        0%, 100% { box-shadow: 0 0 4px 1px rgba(255,101,99,0.6); }
        50%       { box-shadow: 0 0 10px 3px rgba(255,101,99,0.95); }
      }
      .gh-cell-peak {
        animation: cellPulse 2.4s ease-in-out infinite;
      }
    `;
    document.head.appendChild(style);
  }, []);

  /* GitHub contribution grid */
  useEffect(() => {
    const el = contributionsRef.current;
    if (!el) return;

    const buf = document.createElement("canvas");
    buf.width = COLS * SCALE;
    buf.height = ROWS * SCALE;
    const bctx = buf.getContext("2d")!;
    bctx.fillStyle = "#000";
    bctx.fillRect(0, 0, buf.width, buf.height);
    bctx.fillStyle = "#fff";
    bctx.textBaseline = "middle";
    bctx.textAlign = "center";

    let fontSize = ROWS * SCALE;
    do {
      fontSize--;
      bctx.font = `bold ${fontSize}px "DM Mono", monospace`;
    } while (bctx.measureText(HERO_TEXT).width > buf.width * 0.93 && fontSize > 4);

    bctx.fillText(HERO_TEXT, buf.width / 2, buf.height / 2 + 1);

    const pixels = bctx.getImageData(0, 0, buf.width, buf.height).data;

    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLS; col++) {
        let total = 0;
        for (let y = row * SCALE; y < (row + 1) * SCALE; y++) {
          for (let x = col * SCALE; x < (col + 1) * SCALE; x++) {
            total += pixels[(y * buf.width + x) * 4];
          }
        }
        const lit = total / (SCALE * SCALE) > 110;
        const c = document.createElement("i");
        c.style.width = "8px";
        c.style.height = "8px";
        c.style.borderRadius = "2px";
        c.style.display = "block";
        c.style.flexShrink = "0";

        if (lit) {
          const isPeak = Math.random() < 0.25;
          c.style.background = isPeak ? "#e14d4b" : "#a82c2e";
          if (isPeak) {
            c.classList.add("gh-cell-peak");
            c.style.animationDelay = `${(Math.random() * 2.4).toFixed(2)}s`;
          }
        } else {
          const level = CELL_LEVELS[Math.floor(Math.random() * CELL_LEVELS.length)];
          const colors = ["#1a0a0b", "#3f1517", "#5e2224"];
          c.style.background = colors[level];
        }
        el.appendChild(c);
      }
    }

    const card = ghCardRef.current;
    if (!card) return;

    const handleMove = (e: PointerEvent) => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = `perspective(700px) rotateX(${y * -14}deg) rotateY(${x * 16}deg) scale(1.035)`;
    };
    const handleLeave = () => { card.style.transform = ""; };

    card.addEventListener("pointermove", handleMove);
    card.addEventListener("pointerleave", handleLeave);
    return () => {
      card.removeEventListener("pointermove", handleMove);
      card.removeEventListener("pointerleave", handleLeave);
    };
  }, []);

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async () => {
    setFormStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed");

      setFormStatus("done");
      setFormData({ name: "", email: "", message: "" });
    } catch {
      setFormStatus("error");
    }
  };

  return (
    <main>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className={styles.hero} id="home">
        <div className={styles.heroTitleRow}>
          <span className={`${styles.heroName} ${styles.heroNameLeft}`}>
            UMANG
          </span>
          <Image
            className={`${styles.heroPortrait} ${styles.heroPortraitIntro}`}
            src="/avatar.png"
            alt="Portrait of Umang Khemka"
            width={260}
            height={340}
            priority
          />
          <span className={`${styles.heroName} ${styles.heroNameRight}`}>
            KHEMKA
          </span>
        </div>

        {/* ── Bottom row: copy + GitHub card, height-matched ── */}
        <div className={styles.heroBottomRow}>
          <div className={`${styles.heroCopy} ${styles.heroContentIntro}`}>
            <p className={styles.role} style={{ opacity: roleFade ? 1 : 0 }}>
              {ROLES[roleIndex]}
            </p>
            <h1>
              Building scalable backend platforms, AI-powered products with modern
              architecture, and crafting delightful digital experiences.
            </h1>
          </div>

          <div className={`${styles.ghWrap} ${styles.heroContentIntro}`}>
            <div ref={ghCardRef} className={styles.ghCard}>
              <div ref={contributionsRef} className={styles.contributions} />
              <div className={styles.months}>
                <span>Aug</span><span>Sep</span><span>Oct</span>
                <span>Nov</span><span>Dec</span><span>Jan</span><span>Feb</span>
              </div>
            </div>

            {/* ── Stat cards ── */}
            <div className={styles.metrics}>
              {[
                { value: "1000+", label: "Problems solved" },
                { value: "280", label: "Day streak" },
                { value: "1776", label: "Contest rating" },
                { value: "2★", label: "CodeChef rating" },
              ].map(({ value, label }) => (
                <div key={label} className={styles.metric}>
                  <strong>{value}</strong>
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Projects preview ─────────────────────────────── */}
      <section className={`section ${styles.projectsSection}`} id="projects">
        <div className="projects-intro scroll-reveal reveal-up">
          <p className="eyebrow">Featured work</p>
          <h2 className="heading">Selected Projects</h2>
          <p className="eyebrow">Explore more open source work and experiments on GitHub.</p>
          <a className="intro-link" href="https://github.com">GitHub ↗</a>
        </div>

        <article className="project">
          {/* Image → */}
          <div className="project-visual scroll-reveal reveal-left slow">
            <div className="project-image-box">
              <Image
                className="project-img"
                src="/hopcare.png"
                alt="HopCare preview"
                width={600}
                height={390}
              />
            </div>
          </div>

          {/* ← Text */}
          <div className="project-info scroll-reveal reveal-right">
            <p className="project-kicker">
              <b>01</b> Healthcare Platform
            </p>

            <h3>HopCare</h3>

            <p>Full-Stack Healthcare Management Platform</p>

            <p className="project-desc">
              A full-stack healthcare platform enabling seamless appointment
              booking, prescription handling, and doctor–patient interaction
              through secure, role-based dashboards.
            </p>

            <blockquote className="project-note">
              JWT-secured role-based access, conflict-free appointment
              scheduling, and digital prescriptions — all built on a
              single-source-of-truth backend.
            </blockquote>

            <div className="tags">
              <span>React.js</span>
              <span>Node.js</span>
              <span>Express.js</span>
              <span>MongoDB</span>
              <span>JWT</span>
              <span>Zustand</span>
              <span>Tailwind CSS</span>
            </div>

            <div className="project-links">
              <a href="https://github.com/Umang-Khemka/Hopcare-Reactjs" target="_blank" rel="noopener noreferrer">
                Source code ↗
              </a>
              <a href="https://hopcare-reactjs.onrender.com" target="_blank" rel="noopener noreferrer">
                View project ↗
              </a>
            </div>
          </div>
        </article>

        {/* ── Project 02 ─────────────────────────────────── */}
        {/* ── Project 02 ─────────────────────────────────── */}
        <article className="project">
          {/* Text → */}
          <div className="project-info scroll-reveal reveal-left">
            <p className="project-kicker">
              <b>02</b> Video Conferencing
            </p>

            <h3>Meetly</h3>

            <p>Real-Time Video Conferencing Platform</p>

            <p className="project-desc">
              A full-stack video conferencing platform that lets users start, join,
              and manage meetings seamlessly — with guest access, meeting history,
              and real-time video, audio, chat, and screen sharing.
            </p>

            <blockquote className="project-note">
              WebRTC powers live video and screen sharing, while Socket.IO keeps
              chat and participant state in sync across every client.
            </blockquote>

            <div className="tags">
              <span>React.js</span>
              <span>Node.js</span>
              <span>Express.js</span>
              <span>Socket.IO</span>
              <span>WebRTC</span>
              <span>JWT</span>
              <span>Zustand</span>
              <span>Bootstrap</span>
            </div>

            <div className="project-links">
              <a href="https://github.com/Umang-Khemka/Meetly" target="_blank" rel="noopener noreferrer">
                Source code ↗
              </a>
              <a href="https://meetly-3.onrender.com" target="_blank" rel="noopener noreferrer">
                View project ↗
              </a>
            </div>
          </div>

          {/* ← Image */}
          <div className="project-visual scroll-reveal reveal-right slow">
            <div className="project-image-box">
              <Image
                className="project-img"
                src="/meetly.png"
                alt="Meetly preview"
                width={600}
                height={390}
              />
            </div>
          </div>
        </article>

        {/* ── Project 03 ─────────────────────────────────── */}
        <article className="project">
          {/* Image → */}
          <div className="project-visual scroll-reveal reveal-left slow">
            <div className="project-image-box">
              <Image
                className="project-img"
                src="/stayora.png"
                alt="Stayora preview"
                width={600}
                height={390}
              />
            </div>
          </div>

          {/* ← Text */}
          <div className="project-info scroll-reveal reveal-right">
            <p className="project-kicker">
              <b>03</b> Vacation Rentals
            </p>

            <h3>Stayora</h3>

            <p>Vacation Rental & Booking Platform</p>

            <p className="project-desc">
              A full-stack vacation rental platform where hosts list properties
              and users browse, book, and manage accommodations by location,
              category, and price through a responsive interface.
            </p>

            <blockquote className="project-note">
              Wishlist, reviews, and Cloudinary-backed image management make
              listings easy to discover, save, and book.
            </blockquote>

            <div className="tags">
              <span>React.js</span>
              <span>Node.js</span>
              <span>Express.js</span>
              <span>MongoDB</span>
              <span>JWT</span>
              <span>Zustand</span>
              <span>Tailwind CSS</span>
              <span>Cloudinary</span>
            </div>

            <div className="project-links">
              <a href="https://github.com/Umang-Khemka/stayora" target="_blank" rel="noopener noreferrer">
                Source code ↗
              </a>
              <a href="https://stayora-luge.onrender.com" target="_blank" rel="noopener noreferrer">
                View project ↗
              </a>
            </div>
          </div>
        </article>
      </section>

      {/* ── Contact ──────────────────────────────────────── */}
      <section className={`section ${styles.contactSection}`} id="contact">
        <p className="eyebrow scroll-reveal reveal-up">Contact</p>
        <h2 className={`${styles.contactTitle} scroll-reveal reveal-up`}>
          Let&apos;s build something<br />Extraordinary.
        </h2>
        <div className={styles.contactBox}>
          <div className={`${styles.quoteImage} scroll-reveal reveal-left slow`} />
          <div className={`${styles.form} scroll-reveal reveal-right`}>
            <p>
              Whether it&apos;s an internship, collaboration, or just saying hello,
              I&apos;d love to hear from you.
            </p>
            <input
              aria-label="Your name"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleFormChange}
            />
            <input
              aria-label="Your email address"
              name="email"
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleFormChange}
            />
            <textarea
              aria-label="Your message"
              name="message"
              placeholder="Tell me about your project..."
              value={formData.message}
              onChange={handleFormChange}
            />
            <button
              type="button"
              onClick={handleFormSubmit}
              disabled={formStatus === "loading"}
            >
              {formStatus === "done"
                ? "Message sent — thank you"
                : formStatus === "loading"
                  ? "Sending…"
                  : formStatus === "error"
                    ? "Failed — try again"
                    : "Send Message →"}
            </button>
          </div>
        </div>
      </section>

      {/* ── Quote ────────────────────────────────────────── */}
      <div className="quote-section scroll-reveal reveal-up">
        <p className="quote-text">&ldquo;Code is poetry written for machines to read.&rdquo;</p>
        <p className="quote-attribution">— Anonymous</p>
      </div>
    </main>
  );
}