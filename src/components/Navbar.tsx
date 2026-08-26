"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Home",       href: "/" },
  { label: "Projects",   href: "/projects" },
  { label: "About",      href: "/about" },
  { label: "Experience", href: "/experience" },
  { label: "Education",  href: "/education" },
  { label: "Contact",    href: "/contact" },
];

/** Pages whose first section IS a full-bleed hero — nav starts transparent */
const HERO_PAGES = new Set(["/", "/projects", "/contact"]);

export default function Navbar() {
  const pathname = usePathname();
  const hasHero = HERO_PAGES.has(pathname);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (!hasHero) return; // solid pages don't need scroll tracking

    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [hasHero]);

  const navClass = [
    "nav",
    !hasHero ? "solid" : scrolled ? "scrolled" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <nav className={navClass}>
      <Link className="nav-mark" href="/">
        UK
      </Link>

      <ul className="nav-links">
        {navItems.map(({ label, href }) => (
          <li key={href}>
            <Link
              href={href}
              className={pathname === href ? "active" : ""}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>

      <div className="nav-socials">
        <a href="https://linkedin.com" aria-label="LinkedIn" title="LinkedIn">
          in
        </a>
        <a href="https://github.com" aria-label="GitHub" title="GitHub">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
            <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.09 3.29 9.39 7.86 10.91.57.1.78-.25.78-.55 0-.27-.01-1.16-.02-2.11-3.2.7-3.88-1.36-3.88-1.36-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.71.08-.71 1.17.08 1.78 1.2 1.78 1.2 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.55-.29-5.23-1.28-5.23-5.68 0-1.25.45-2.28 1.19-3.08-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.64 1.59.24 2.76.12 3.05.74.8 1.18 1.83 1.18 3.08 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.06.78 2.14 0 1.55-.01 2.79-.01 3.17 0 .3.2.66.79.55A10.51 10.51 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z" />
          </svg>
        </a>
        <a href="mailto:hello@example.com" aria-label="Email" title="Email">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6">
            <rect x="2.5" y="4.5" width="19" height="15" rx="2" />
            <path d="M3 6l9 7 9-7" />
          </svg>
        </a>
        <a href="/resume.pdf" aria-label="Resume" title="Resume">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M6 2.5h8l4 4V21a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1Z" />
            <path d="M14 2.5V7h4" />
            <path d="M8 12h8M8 15.5h8M8 9h3" />
          </svg>
        </a>
      </div>
    </nav>
  );
}
