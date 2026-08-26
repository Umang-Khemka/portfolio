import type { Metadata } from "next";
import Image from "next/image";
import styles from "./experience.module.css";

export const metadata: Metadata = {
  title: "Experience — Umang Gajjar",
};

const experiences = [
  {
    logo: "/zipNom-logo.png",
    company: "AirDawg Labs",
    role: "AI Systems Evaluation Intern",
    dates: "Jul 2026 – Present",
    points: [
      "Designed and implemented complex AI evaluation tasks using Docker, Python, and Linux-based environments to benchmark autonomous coding agents.",
      "Built deterministic reference solutions and comprehensive automated test suites to validate agent behavior across diverse real-world scenarios.",
      "Collaborated with the AI evaluation team to improve task quality, reproducibility, and benchmarking accuracy for large language models.",
      "Worked extensively with Git, CI workflows, and containerized development while contributing to high-quality datasets for AI systems evaluation.",
    ],
  }
];

export default function ExperiencePage() {
  return (
    <main>
      <section className={`section ${styles.heroSection}`} id="experience-hero">
        <p className="eyebrow">Career</p>
        <h1 className={styles.heroHeading}>
          Professional<br />Experience
        </h1>
      </section>

      <section className={`section ${styles.expSection}`} id="experience">
        {experiences.map((exp) => (
          <article className={styles.expEntry} key={exp.company}>
            <div className={styles.expLeft}>
              <div className={styles.expLogo}>
                <Image src={exp.logo} alt={`${exp.company} logo`} width={140} height={140} />
              </div>
              <div className={styles.expInfo}>
                <p className={styles.expDates}>{exp.dates}</p>
                <h2 className={styles.expRole}>{exp.role}</h2>
                <p className={styles.expCompany}>{exp.company}</p>
              </div>
            </div>
            <div className={styles.expDivider} />
            <ul className={styles.expPoints}>
              {exp.points.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
          </article>
        ))}
      </section>
    </main>
  );
}
