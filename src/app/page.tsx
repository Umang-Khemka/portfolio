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
  const [formDone, setFormDone] = useState(false);
  const contributionsRef = useRef<HTMLDivElement>(null);
  const ghCardRef = useRef<HTMLDivElement>(null);
  const revealRef = useRef<HTMLElement | null>(null);

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
            <p className={styles.ghUser}>umangkhemka ↗</p>
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
          <div className="project-visual scroll-reveal reveal-left-slow">
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
          <div className="project-info scroll-reveal reveal-right">
            <p className="project-kicker"><b>01</b> Collaboration</p>
            <h3>CollabBoard</h3>
            <p>Real-time Collaborative Workspace</p>
            <p className="project-desc">
              A real-time workspace for teams to plan, discuss, and ship
              together. Built around fluid collaboration and reliable updates.
            </p>
            <blockquote className="project-note">
              Features live boards, drag-and-drop cards, and instant sync
              across every teammate's screen.
            </blockquote>
            <div className="tags">
              <span>React</span><span>Node.js</span><span>Express</span>
              <span>Socket.IO</span><span>MongoDB</span>
            </div>
            <div className="project-links">
              <a href="#">Source code ↗</a><a href="#">View project ↗</a>
            </div>
          </div>
        </article>

        <article className="project">
          <div className="project-info scroll-reveal reveal-left">
            <p className="project-kicker"><b>02</b> AI Platform</p>
            <h3>ArmorIQ</h3>
            <p>Secure Enterprise AI Agent Platform</p>
            <p className="project-desc">
              A secure AI agent platform that helps teams interact with external
              tools through a carefully governed, auditable control layer.
            </p>
            <blockquote className="project-note">
              Every tool call is authenticated, logged, and reviewable —
              nothing runs outside the governed path.
            </blockquote>
            <div className="tags">
              <span>Next.js</span><span>TypeScript</span>
              <span>PostgreSQL</span><span>Docker</span>
            </div>
            <div className="project-links">
              <a href="#">Source code ↗</a><a href="#">View project ↗</a>
            </div>
          </div>
          <div className="project-visual scroll-reveal reveal-right-slow">
            <div className="project-image-box">
              <Image
                className="project-img"
                src="/meetly.png"
                alt="ArmorIQ preview"
                width={600}
                height={390}
              />
            </div>
          </div>
        </article>

        <article className="project">
          <div className="project-visual scroll-reveal reveal-left-slow">
            <div className="project-image-box">
              <Image
                className="project-img"
                src="/stayora.png"
                alt="SignalDock preview"
                width={600}
                height={390}
              />
            </div>
          </div>
          <div className="project-info scroll-reveal reveal-right">
            <p className="project-kicker"><b>03</b> Webhook Platform</p>
            <h3>SignalDock</h3>
            <p>Production-Ready Webhook Infrastructure</p>
            <p className="project-desc">
              A resilient webhook delivery platform for processing asynchronous
              events at scale, with retries, observability and dead-letter
              queues built in.
            </p>
            <blockquote className="project-note">
              Failed deliveries retry with backoff and land in a dead-letter
              queue instead of vanishing silently.
            </blockquote>
            <div className="tags">
              <span>Node.js</span><span>TypeScript</span><span>BullMQ</span>
              <span>Redis</span><span>Prisma</span>
            </div>
            <div className="project-links"><a href="#">Source code ↗</a></div>
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
            <input aria-label="Your name" placeholder="Your Name" />
            <input aria-label="Your email address" type="email" placeholder="Email Address" />
            <textarea aria-label="Your message" placeholder="Tell me about your project..." />
            <button type="button" onClick={() => setFormDone(true)}>
              {formDone ? "Message ready — thank you" : "Send Message →"}
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