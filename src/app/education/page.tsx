import type { Metadata } from "next";
import Image from "next/image";
import styles from "./education.module.css";

export const metadata: Metadata = {
  title: "Education — Umang Gajjar",
};

export default function EducationPage() {
  return (
    <main>
      <section className={`section ${styles.heroSection}`} id="education-hero">
        <p className="eyebrow">Education</p>
        <h1 className={styles.heroHeading}>
          Education<br />&amp; Background
        </h1>
      </section>

      <section className={`section ${styles.eduSection}`} id="education">
        <article className={styles.eduEntry}>
          <div className={styles.eduLogo}>
            <Image
              src="/scet-logo.png"
              alt="Sarvajanik College of Engineering and Technology logo"
              width={184}
              height={184}
            />
          </div>
          <div className={styles.eduDivider} />
          <div className={styles.eduInfo}>
            <p className={styles.eduDates}>2023 — 2027</p>
            <h2 className={styles.eduDegree}>Bachelor of Technology</h2>
            <p className={styles.eduField}>Computational Engineering</p>
            <p className={styles.eduSchool}>
              Sarvajanik College of Engineering and Technology
            </p>
            <p className={styles.eduDesc}>
              Building a strong foundation in computer science, software
              engineering, algorithms, distributed systems, databases and
              modern full-stack development while actively applying concepts
              through production-grade projects and competitive programming.
              CGPA: 8.2
            </p>
          </div>
        </article>

        <div className={styles.cards}>
          <div className={styles.card}>
            <h3>Technical Focus</h3>
            <ul>
              <li>Full Stack Development</li>
              <li>Backend Engineering</li>
              <li>AI Systems &amp; LLM Evaluation</li>
              <li>Distributed Systems</li>
              <li>Cloud &amp; DevOps</li>
              <li>Competitive Programming</li>
            </ul>
          </div>
          <div className={styles.card}>
            <h3>Achievements</h3>
            <ul>
              <li>1000+ Problems Solved Across Platforms</li>
              <li>Global Rank 294 — CodeChef Starters 225</li>
              <li>1760+ LeetCode Rating</li>
              <li>2★ CodeChef Rating</li>
              <li>Built 4+ Production Grade Projects</li>
              <li>Strong Foundation in DSA &amp; System Design</li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
