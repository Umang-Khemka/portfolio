import type { Metadata } from "next";
import styles from "./about.module.css";

export const metadata: Metadata = {
  title: "About — Umang Khemka",
};

const lines = [
  {
    ln: 1,
    code: (
      <>
        <span className={styles.tokKw}>const</span>{" "}
        <span className={styles.tokVar}>developer</span>{" "}
        <span className={styles.tokPunc}>=</span>{" "}
        <span className={styles.tokPunc}>{"{"}</span>
      </>
    ),
  },
  { ln: 2, code: null },

  {
    ln: 3,
    code: (
      <>
        &nbsp;&nbsp;<span className={styles.tokKey}>name</span>
        <span className={styles.tokPunc}>:</span>{" "}
        <span className={styles.tokStr}>&quot;Umang Khemka&quot;</span>
        <span className={styles.tokPunc}>,</span>
      </>
    ),
  },
  { ln: 4, code: null },

  {
    ln: 5,
    code: (
      <>
        &nbsp;&nbsp;<span className={styles.tokKey}>role</span>
        <span className={styles.tokPunc}>:</span>{" "}
        <span className={styles.tokStr}>
          &quot;Software Developer&quot;
        </span>
        <span className={styles.tokPunc}>,</span>
      </>
    ),
  },
  { ln: 6, code: null },

  {
    ln: 7,
    code: (
      <>
        &nbsp;&nbsp;<span className={styles.tokKey}>education</span>
        <span className={styles.tokPunc}>:</span>{" "}
        <span className={styles.tokStr}>
          &quot;B.Tech Computational Engineering&quot;
        </span>
        <span className={styles.tokPunc}>,</span>
      </>
    ),
  },
  { ln: 8, code: null },

  {
    ln: 9,
    code: (
      <>
        &nbsp;&nbsp;<span className={styles.tokKey}>cgpa</span>
        <span className={styles.tokPunc}>:</span>{" "}
        <span className={styles.tokStr}>&quot;8.2 / 10&quot;</span>
        <span className={styles.tokPunc}>,</span>
      </>
    ),
  },
  { ln: 10, code: null },

  {
    ln: 11,
    code: (
      <>
        &nbsp;&nbsp;<span className={styles.tokKey}>experience</span>
        <span className={styles.tokPunc}>:</span>{" "}
        <span className={styles.tokStr}>
          &quot;Software Developer Intern @ ZipNom&quot;
        </span>
        <span className={styles.tokPunc}>,</span>
      </>
    ),
  },
  { ln: 12, code: null },

  {
    ln: 13,
    code: (
      <>
        &nbsp;&nbsp;<span className={styles.tokKey}>techStack</span>
        <span className={styles.tokPunc}>:</span>{" "}
        [
        <span className={styles.tokStr}>&quot;React.js&quot;</span>,{" "}
        <span className={styles.tokStr}>&quot;Node.js&quot;</span>,{" "}
        <span className={styles.tokStr}>&quot;Express.js&quot;</span>,{" "}
        <span className={styles.tokStr}>&quot;Next.js&quot;</span>,{" "}
        <span className={styles.tokStr}>&quot;TypeScript&quot;</span>,{" "}
        <span className={styles.tokStr}>&quot;MongoDB&quot;</span>,{" "}
        <span className={styles.tokStr}>&quot;Prisma ORM&quot;</span>,{" "}
        <span className={styles.tokStr}>&quot;JavaScript&quot;</span>]
        <span className={styles.tokPunc}>,</span>
      </>
    ),
  },
  { ln: 14, code: null },

  {
    ln: 15,
    code: (
      <>
        &nbsp;&nbsp;<span className={styles.tokKey}>cloud</span>
        <span className={styles.tokPunc}>:</span>{" "}
        [
        <span className={styles.tokStr}>&quot;AWS&quot;</span>,{" "}
        <span className={styles.tokStr}>&quot;S3&quot;</span>,{" "}
        <span className={styles.tokStr}>&quot;EC2&quot;</span>,{" "}
        <span className={styles.tokStr}>
          &quot;MediaConvert&quot;
        </span>
        ]
        <span className={styles.tokPunc}>,</span>
      </>
    ),
  },
  { ln: 16, code: null },

  {
    ln: 17,
    code: (
      <>
        &nbsp;&nbsp;<span className={styles.tokKey}>openSource</span>
        <span className={styles.tokPunc}>:</span>{" "}
        <span className={styles.tokStr}>
          &quot;3 Merged PRs @ PictoPy&quot;
        </span>
        <span className={styles.tokPunc}>,</span>
      </>
    ),
  },
  { ln: 18, code: null },

  {
    ln: 19,
    code: (
      <>
        &nbsp;&nbsp;<span className={styles.tokKey}>interests</span>
        <span className={styles.tokPunc}>:</span>{" "}
        [
        <span className={styles.tokStr}>&quot;Open Source&quot;</span>,{" "}
        <span className={styles.tokStr}>
          &quot;Competitive Programming&quot;
        </span>
        ,{" "}
        <span className={styles.tokStr}>&quot;System Design&quot;</span>]
      </>
    ),
  },

  {
    ln: 20,
    code: (
      <>
        <span className={styles.tokPunc}>{"}"}</span>
        <span className={styles.tokPunc}>;</span>
      </>
    ),
  },
  { ln: 21, code: null },

  {
    ln: 22,
    code: (
      <>
        <span className={styles.tokKw}>export default</span>{" "}
        <span className={styles.tokVar}>developer</span>
        <span className={styles.tokPunc}>;</span>
      </>
    ),
  },
];

export default function AboutPage() {
  return (
    <main>
      <section className={`section ${styles.aboutSection}`} id="about">
        <p className="eyebrow">About</p>

        <h1 className={styles.heading}>About Me</h1>

        <p className={styles.aboutCopy}>
          A quick look at who I am, in the format I spend most of my day
          reading and writing.
        </p>

        <div className={styles.deviceFrame}>
          <div className={styles.codeWindow}>
            <div className={styles.codeTitlebar}>
              <div className={styles.traffic}>
                <i className={styles.c1} />
                <i className={styles.c2} />
                <i className={styles.c3} />
              </div>

              <span className={styles.codeTab}>
                <b>JS</b> AboutMe.js
              </span>
            </div>

            <div className={styles.codeBody}>
              {lines.map(({ ln, code }) => (
                <div key={ln} className={styles.codeLine}>
                  <span className={styles.ln}>{ln}</span>
                  <span>{code}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}