import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <Link className="footer-mark" href="/">
        UG
      </Link>

      <div className="footer-right">
        <div className="footer-socials">
          <a href="https://linkedin.com" aria-label="LinkedIn" title="LinkedIn">
            <svg viewBox="0 0 24 24" width="19" height="19" fill="currentColor">
              <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5.001 2.5 2.5 0 0 1 0-5.001zM3 9h4v12H3zM9 9h3.6v1.71h.05c.5-.95 1.73-1.95 3.56-1.95C20.1 8.76 21 11.13 21 14.28V21h-4v-5.95c0-1.42-.03-3.25-1.98-3.25-1.98 0-2.29 1.55-2.29 3.15V21H9z" />
            </svg>
          </a>
          <a href="https://github.com" aria-label="GitHub" title="GitHub">
            <svg viewBox="0 0 24 24" width="19" height="19" fill="currentColor">
              <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.09 3.29 9.39 7.86 10.91.57.1.78-.25.78-.55 0-.27-.01-1.16-.02-2.11-3.2.7-3.88-1.36-3.88-1.36-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.71.08-.71 1.17.08 1.78 1.2 1.78 1.2 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.55-.29-5.23-1.28-5.23-5.68 0-1.25.45-2.28 1.19-3.08-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.64 1.59.24 2.76.12 3.05.74.8 1.18 1.83 1.18 3.08 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.06.78 2.14 0 1.55-.01 2.79-.01 3.17 0 .3.2.66.79.55A10.51 10.51 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z" />
            </svg>
          </a>
          <a href="https://leetcode.com" aria-label="LeetCode" title="LeetCode">
            <svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M8 8l-4 4 4 4M16 8l4 4-4 4M13 5l-3 14" />
            </svg>
          </a>
          <a href="https://twitter.com" aria-label="X" title="X">
            <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor">
              <path d="M18.146 2H21l-7.19 8.22L22 22h-6.844l-5.36-7.02L3.6 22H.744l7.73-8.84L2 2h6.99l4.84 6.42L18.146 2Zm-1.2 18h1.9L7.13 4H5.1l11.846 16Z" />
            </svg>
          </a>
        </div>
        <p className="footer-copy">© 2026 UMANG GAJJAR</p>
      </div>
    </footer>
  );
}
