import type { Metadata } from "next";
import Image from "next/image";
import styles from "./education.module.css";

export const metadata: Metadata = {
  title: "Education — Umang Khemka",
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

            <h2 className={styles.eduDegree}>
              Bachelor of Technology
            </h2>

            <p className={styles.eduField}>
              Computer Engineering
            </p>

            <p className={styles.eduSchool}>
              Sarvajanik College of Engineering and Technology
            </p>

            <p className={styles.eduDesc}>
              Pursuing a B.Tech in Computer Engineering with a focus on
              software development, data structures &amp; algorithms,
              backend engineering, databases, distributed systems and
              modern web technologies. Building full-stack applications
              while strengthening problem-solving skills through competitive
              programming and practical software projects. CGPA: 8
            </p>
          </div>
        </article>

        <div className={styles.cards}>
          <div className={styles.card}>
            <h3>Technical Focus</h3>
            <ul>
              <li>Data Structures &amp; Algorithms</li>
              <li>Full Stack Development</li>
              <li>Backend Engineering</li>
              <li>Distributed Systems &amp; Databases</li>
              <li>Cloud &amp; DevOps</li>
              <li>AI &amp; LLM Systems</li>
            </ul>
          </div>

          <div className={styles.card}>
            <h3>Highlights</h3>
            <ul>
              <li>500+ Problems Solved Across Platforms</li>
              <li>1600+ Rating on LeetCode</li>
              <li>Hands-on Experience with MERN &amp; Next.js</li>
              <li>Built Full-Stack Production Projects</li>
              <li>Software Developer Internship Experience</li>
              <li>Experience with Docker, Redis &amp; Cloud Deployment</li>
              <li>3 Open-Source Pull Requests Merged in AOSSIE-Org PictoPy Project</li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}