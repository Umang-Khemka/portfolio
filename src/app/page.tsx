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

type ContribDay = { date: string; contributionCount: number };

const getLast336Days = (githubDays: ContribDay[]) => {
  const lookup = new Map(
    githubDays.map((day) => [day.date, day.contributionCount])
  );

  const result: ContribDay[] = [];
  const today = new Date();

  // Build exactly 56 × 6 = 336 days, ending today.
  // Using local date parts avoids timezone shifting around midnight.
  for (let i = 335; i >= 0; i--) {
    const date = new Date(today);
    date.setHours(12, 0, 0, 0);
    date.setDate(today.getDate() - i);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const dateString = `${year}-${month}-${day}`;

    result.push({
      date: dateString,
      contributionCount: lookup.get(dateString) ?? 0,
    });
  }

  return result;
};

const getContributionMonths = (days: ContribDay[]) => {
  if (!days.length) return [];

  const months: { label: string; index: number }[] = [];
  let previousMonth = "";

  days.forEach((day, index) => {
    const date = new Date(`${day.date}T12:00:00`);
    const key = `${date.getFullYear()}-${date.getMonth()}`;

    if (key !== previousMonth) {
      months.push({
        label: date.toLocaleString("en-US", {
          month: "short",
        }),
        index,
      });

      previousMonth = key;
    }
  });

  return months;
};

export default function HomePage() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [roleFade, setRoleFade] = useState(true);
  const contributionsRef = useRef<HTMLDivElement>(null);
  const ghCardRef = useRef<HTMLDivElement>(null);
  const revealRef = useRef<HTMLElement | null>(null);
  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const [contribDays, setContribDays] = useState<ContribDay[] | null>(null);
  const [contribFailed, setContribFailed] = useState(false);

  // Always display exactly 56 × 6 = 336 calendar days, ending today.
  const displayDays = contribDays ? getLast336Days(contribDays) : [];
  const contributionMonths = getContributionMonths(displayDays);

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

  /* Fetch real GitHub contributions — falls back silently on failure */
  useEffect(() => {
    fetch("/api/github-contributions")
      .then((res) => {
        if (!res.ok) throw new Error("Bad response");
        return res.json();
      })
      .then((data) => {
        if (data.days && Array.isArray(data.days) && data.days.length > 0) {
          setContribDays(data.days);
        } else {
          setContribFailed(true);
        }
      })
      .catch((err) => {
        console.error("Failed to load GitHub contributions, using fallback grid:", err);
        setContribFailed(true);
      });
  }, []);

  /* GitHub contribution grid — real data if available, random fallback otherwise */
  useEffect(() => {
    const el = contributionsRef.current;
    if (!el) return;

    // Still waiting on the fetch to resolve one way or the other — don't render yet.
    const stillWaiting = !contribDays && !contribFailed;
    if (stillWaiting) return;

    el.innerHTML = ""; // clear in case this re-runs

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

    // Prepare real-data lookup if we have it
    const cellCount = COLS * ROWS;
    const recentDays = contribDays ? getLast336Days(contribDays) : null;
    const maxCount = recentDays
      ? Math.max(...recentDays.map((d) => d.contributionCount), 1)
      : 1;

    const colors = [
      "#1a0a0b", // 0 contributions
      "#3f1517", // low
      "#7a292b", // medium
      "#e14d4b", // high
    ];

    const getRealLevel = (count: number) => {
      if (count === 0) return 0;
      if (count <= 2) return 1;
      if (count <= 5) return 2;
      return 3;
    };

    let dayIndex = 0;

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

        const day = recentDays?.[dayIndex];
        const level = day ? getRealLevel(day.contributionCount) : 0;

        if (day) {
          c.title = `${day.date}: ${day.contributionCount} contributions`;
        }

        if (recentDays) {
          // Keep the existing UMANGKHEMKA pixel shape, but let real
          // contribution activity control the intensity of every day.
          if (lit) {
            c.style.background = level >= 3 ? "#ff625f" : "#a82c2e";
          } else {
            c.style.background = colors[level];
          }

          // Highest-contribution days get the visible glow.
          if (level === 3) {
            c.style.background = "#ff625f";
            c.style.boxShadow =
              "0 0 6px 2px rgba(255, 80, 80, 0.9), 0 0 14px 4px rgba(255, 60, 60, 0.45)";
            c.style.transform = "scale(1.08)";
            c.style.position = "relative";
            c.style.zIndex = "2";
            c.classList.add("gh-cell-peak");
          }
        } else {
          // Fallback: original random path
          const fallbackLevel =
            CELL_LEVELS[Math.floor(Math.random() * CELL_LEVELS.length)];
          c.style.background = colors[fallbackLevel];
        }
        dayIndex++;
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
  }, [contribDays, contribFailed]);

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
                {contributionMonths.map((month, index) => (
                  <span key={`${month.label}-${month.index}`}>{month.label}</span>
                ))}
              </div>
            </div>

            {/* ── Stat cards ── */}
            <div className={styles.metrics}>
              {[
                { value: "500+", label: "Problems solved" },
                { value: "1600+", label: "Contest rating" },
                { value: "41", label: "POTD streak on GFG" },
                { value: "3", label: "Open Source Contributions" },
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
        <p className="quote-attribution">— Umang Khemka</p>
      </div>
    </main>
  );
}