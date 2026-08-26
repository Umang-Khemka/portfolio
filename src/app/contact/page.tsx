"use client";

import { useState } from "react";
import styles from "./contact.module.css";

export default function ContactPage() {
  const [done, setDone] = useState(false);

  return (
    <main>
      <section className={`section ${styles.contactSection}`} id="contact">
        <p className="eyebrow">Contact</p>
        <h1 className={styles.contactTitle}>
          Let&apos;s build something<br />Extraordinary.
        </h1>
        <div className={styles.contactBox}>
          <div className={styles.quoteImage} />
          <div className={styles.form}>
            <p>
              Whether it&apos;s an internship, collaboration, or just saying hello,
              I&apos;d love to hear from you.
            </p>
            <input aria-label="Your name" placeholder="Your Name" />
            <input aria-label="Your email address" type="email" placeholder="Email Address" />
            <textarea aria-label="Your message" placeholder="Tell me about your project..." />
            <button type="button" onClick={() => setDone(true)}>
              {done ? "Message ready — thank you" : "Send Message →"}
            </button>
          </div>
        </div>
      </section>

      <div className="quote-section">
        <p className="quote-text">&ldquo;Code is poetry written for machines to read.&rdquo;</p>
        <p className="quote-attribution">— Anonymous</p>
      </div>
    </main>
  );
}
