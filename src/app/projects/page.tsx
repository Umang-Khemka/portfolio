"use client";

import Image from "next/image";
import type { Metadata } from "next";
import styles from "./projects.module.css";

const handleProjectHover = (e: React.MouseEvent<HTMLDivElement>) => {
  const el = e.currentTarget;
  el.classList.remove("shine");
  void el.offsetWidth;
  el.classList.add("shine");
};

export default function ProjectsPage() {
  return (
    <main>
      <section className={`section ${styles.projectsSection}`} id="projects">
        <div className="projects-intro">
          <p className="eyebrow">Featured work</p>
          <h1 className="heading">Selected Projects</h1>
          <p className="eyebrow">
            Explore more open source work and experiments on GitHub.
          </p>
          <a className="intro-link" href="https://github.com">GitHub ↗</a>
        </div>

        <article className="project">
          <div className="project-visual" onMouseEnter={handleProjectHover}>
            <Image className="project-img" src="/hopcare.png" alt="HopCare preview" width={600} height={390} />
          </div>
          <div className="project-info">
            <p className="project-kicker"><b>01</b> Collaboration</p>
            <h2>CollabBoard</h2>
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
              <span>React</span><span>Node.js</span><span>Express</span>
              <span>Socket.IO</span><span>MongoDB</span>
            </div>
            <div className="project-links">
              <a href="#">Source code ↗</a><a href="#">View project ↗</a>
            </div>
          </div>
        </article>

        <article className="project">
          <div className="project-info">
            <p className="project-kicker"><b>02</b> AI Platform</p>
            <h2>ArmorIQ</h2>
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
          <div className="project-visual" onMouseEnter={handleProjectHover}>
            <Image className="project-img" src="/meetly.png" alt="ArmorIQ preview" width={600} height={390} />
          </div>
        </article>

        <article className="project">
          <div className="project-visual" onMouseEnter={handleProjectHover}>
            <Image className="project-img" src="/stayora.png" alt="SignalDock preview" width={600} height={390} />
          </div>
          <div className="project-info">
            <p className="project-kicker"><b>03</b> Webhook Platform</p>
            <h2>SignalDock</h2>
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
    </main>
  );
}
