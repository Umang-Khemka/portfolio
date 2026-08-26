"use client";

import Image from "next/image";
import { useEffect } from "react";
import styles from "./projects.module.css";

export default function ProjectsPage() {
  /* ── Scroll reveal ───────────────────────────────────── */
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

  return (
    <main>
      <section
        className={`section ${styles.projectsSection}`}
        id="projects"
      >
        {/* ── Projects intro ─────────────────────────────── */}
        <div className="projects-intro scroll-reveal reveal-up">
          <p className="eyebrow">Featured work</p>

          <h1 className="heading">Selected Projects</h1>

          <p className="eyebrow">
            Explore more open source work and experiments on GitHub.
          </p>

          <a
            className="intro-link"
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub ↗
          </a>
        </div>

        {/* ── Project 01 ─────────────────────────────────── */}
        <article className="project">
          {/* Image → */}
          <div className="project-visual scroll-reveal reveal-left slow">
            <div className="project-image-box">
              <Image
                className="project-img"
                src="/hopcare.png"
                alt="CollabBoard preview"
                width={600}
                height={390}
              />
            </div>
          </div>

          {/* ← Text */}
          <div className="project-info scroll-reveal reveal-right">
            <p className="project-kicker">
              <b>01</b> Collaboration
            </p>

            <h3>CollabBoard</h3>

            <p>Real-time Collaborative Workspace</p>

            <p className="project-desc">
              A real-time workspace for teams to plan, discuss, and ship
              together. Built around fluid collaboration and reliable updates.
            </p>

            <blockquote className="project-note">
              Features live boards, drag-and-drop cards, and instant sync
              across every teammate&apos;s screen.
            </blockquote>

            <div className="tags">
              <span>React</span>
              <span>Node.js</span>
              <span>Express</span>
              <span>Socket.IO</span>
              <span>MongoDB</span>
            </div>

            <div className="project-links">
              <a href="#">Source code ↗</a>
              <a href="#">View project ↗</a>
            </div>
          </div>
        </article>

        {/* ── Project 02 ─────────────────────────────────── */}
        <article className="project">
          {/* Text → */}
          <div className="project-info scroll-reveal reveal-left">
            <p className="project-kicker">
              <b>02</b> AI Platform
            </p>

            <h3>ArmorIQ</h3>

            <p>Secure Enterprise AI Agent Platform</p>

            <p className="project-desc">
              A secure AI agent platform that helps teams interact with
              external tools through a carefully governed, auditable control
              layer.
            </p>

            <blockquote className="project-note">
              Every tool call is authenticated, logged, and reviewable —
              nothing runs outside the governed path.
            </blockquote>

            <div className="tags">
              <span>Next.js</span>
              <span>TypeScript</span>
              <span>PostgreSQL</span>
              <span>Docker</span>
            </div>

            <div className="project-links">
              <a href="#">Source code ↗</a>
              <a href="#">View project ↗</a>
            </div>
          </div>

          {/* ← Image */}
          <div className="project-visual scroll-reveal reveal-right slow">
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

        {/* ── Project 03 ─────────────────────────────────── */}
        <article className="project">
          {/* Image → */}
          <div className="project-visual scroll-reveal reveal-left slow">
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

          {/* ← Text */}
          <div className="project-info scroll-reveal reveal-right">
            <p className="project-kicker">
              <b>03</b> Webhook Platform
            </p>

            <h3>SignalDock</h3>

            <p>Production-Ready Webhook Infrastructure</p>

            <p className="project-desc">
              A resilient webhook delivery platform for processing
              asynchronous events at scale, with retries, observability and
              dead-letter queues built in.
            </p>

            <blockquote className="project-note">
              Failed deliveries retry with backoff and land in a dead-letter
              queue instead of vanishing silently.
            </blockquote>

            <div className="tags">
              <span>Node.js</span>
              <span>TypeScript</span>
              <span>BullMQ</span>
              <span>Redis</span>
              <span>Prisma</span>
            </div>

            <div className="project-links">
              <a href="#">Source code ↗</a>
            </div>
          </div>
        </article>
      </section>
    </main>
  );
}