"use client";

import { useEffect, useRef, useState } from "react";

type ScrollRevealProps = {
  children: React.ReactNode;
  className?: string;
  once?: boolean;
};

export default function ScrollReveal({
  children,
  className = "",
  once = true,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);

          if (once) {
            observer.unobserve(element);
          }
        } else if (!once) {
          setVisible(false);
        }
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -80px 0px",
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [once]);

  return (
    <div
      ref={ref}
      className={`${className} ${visible ? "is-visible" : ""}`}
    >
      {children}
    </div>
  );
}