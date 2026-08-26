import type { Metadata } from "next";
import Image from "next/image";
import styles from "./experience.module.css";



const experiences = [
  {
    logo: "/zipNom-logo.png",
    company: "Zipnom",
    role: "Software Developer Intern",
    dates: "Feb 2026 – Apr 2026",
    points: [
      "Worked on Verizol AI, a subscription-based platform providing company-wise LLP data including email and phone information across regions.",
      "Built admin-side APIs for user management, subscriptions, dashboards, sales & analytics, and request tracking, along with company data management and review APIs for users.",
      "Integrated APIs across admin and user panels and implemented access control to manage user permissions and data visibility.",
      "Contributed to the frontend by building UI for key dashboard pages.",
      "Contributed to Medny AI, an appointment booking platform for patients and doctors by resolving bugs, improving system stability, and addressing image loading and performance issues.",
      "Implemented media compression for images and videos using AWS MediaConvert, integrated Zoho CRM for automated marketing emails, and enhanced doctor dashboard security with cross-login authentication.",
      "Deployed the Money Mati project on AWS EC2, handling server setup and deployment workflows.",
    ],
  },
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
                <Image
                  src={exp.logo}
                  alt={`${exp.company} logo`}
                  width={140}
                  height={140}
                />
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