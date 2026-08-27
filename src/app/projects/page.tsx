"use client";

import Image from "next/image";
import { useEffect } from "react";
import styles from "./projects.module.css";
import { ArrowUpRight } from "lucide-react";

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
            href="https://github.com/Umang-Khemka"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub <ArrowUpRight size={18} />
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
                Source code <ArrowUpRight size={18} />
              </a>
              <a href="https://hopcare-reactjs.onrender.com" target="_blank" rel="noopener noreferrer">
                View project <ArrowUpRight size={18} />
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
                Source code <ArrowUpRight size={18} />
              </a>
              <a href="https://meetly-3.onrender.com" target="_blank" rel="noopener noreferrer">
                View project <ArrowUpRight size={18} />
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
                Source code <ArrowUpRight size={18} />
              </a>
              <a href="https://stayora-luge.onrender.com" target="_blank" rel="noopener noreferrer">
                View project <ArrowUpRight size={18} />
              </a>
            </div>
          </div>
        </article>
      </section>
    </main>
  );
}