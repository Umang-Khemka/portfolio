"use client";

import { useState } from "react";
import styles from "./contact.module.css";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed");

      setStatus("done");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

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
            <input
              aria-label="Your name"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
            />
            <input
              aria-label="Your email address"
              name="email"
              type="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
            />
            <textarea
              aria-label="Your message"
              name="message"
              placeholder="Tell me about your project..."
              value={form.message}
              onChange={handleChange}
            />
            <button
              type="button"
              onClick={handleSubmit}
              disabled={status === "loading"}
            >
              {status === "done"
                ? "Message sent — thank you"
                : status === "loading"
                ? "Sending…"
                : status === "error"
                ? "Failed — try again"
                : "Send Message →"}
            </button>
          </div>
        </div>
      </section>

      <div className="quote-section">
        <p className="quote-text">&ldquo;Code is poetry written for machines to read.&rdquo;</p>
        <p className="quote-attribution">— Umang Khemka</p>
      </div>
    </main>
  );
}