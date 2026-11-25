import { useEffect, useState } from "react";
import { links, phrases, projects, skillGroups } from "../data/content.js";
import { useTypewriter } from "../hooks.js";
import HeroCode from "./HeroCode.jsx";
import { DownloadIcon, GitHubIcon, LinkedInIcon, MailIcon } from "./Icons.jsx";

const stats = [
  { value: projects.length, label: "Projects built" },
  { value: projects.filter((p) => p.status === "Live").length, label: "Live in production" },
  { value: new Set(skillGroups.flatMap((g) => g.items)).size, label: "Technologies" },
];

// Counts up from 0 once on mount (skipped for reduced motion).
function CountUp({ to }) {
  const [n, setN] = useState(() =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ? to : 0
  );
  useEffect(() => {
    if (n === to) return;
    const start = performance.now();
    let raf;
    const tick = (now) => {
      const t = Math.min((now - start) / 1200, 1);
      setN(Math.round(to * (1 - (1 - t) ** 3)));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [to]);
  return n;
}

export default function Hero() {
  const typedText = useTypewriter(phrases);

  return (
    <section id="home" className="hero-section">
      <div className="hero-glow" aria-hidden="true" />
      <div className="container">
        <div className="hero-grid">
          <div className="hero-copy">
            <p className="hero-badge">
              <span className="live-dot" />
              <span>
                BTech Software Engineering ·{" "}
                <span className="long-name">Harare Institute of Technology</span>
                <abbr className="short-name" title="Harare Institute of Technology">HIT</abbr>
              </span>
            </p>
            <h1 className="hero-title">
              Hi, I'm <span className="name">Wilmar</span>
              <span className="line2">
                I build software that solves real problems.
              </span>
            </h1>
            <p className="sr-only">I enjoy {phrases.join(", ")}.</p>
            <div className="terminal-line" aria-hidden="true">
              <span className="prompt"><span className="prompt-path">~/wilmar </span>$</span>
              <span>{typedText}</span>
              <span className="cursor" />
            </div>
            <p className="hero-text">
              Focused on mobile systems, full-stack development and
              agricultural technology — building practical tools with
              measurable impact, from offline-first Android apps to live
              payment systems.
            </p>
            <div className="hero-actions">
              <a href="#projects" className="btn btn-primary">
                View Projects
              </a>
              <a href="#contact" className="btn btn-outline">
                Contact Me
              </a>
              <a href={links.cv} className="btn btn-outline">
                <DownloadIcon /> Download CV
              </a>
            </div>
            <div className="social-strip">
              <a href={links.github} target="_blank" rel="noreferrer" className="social-pill">
                <GitHubIcon /> GitHub
              </a>
              <a href={links.linkedin} target="_blank" rel="noreferrer" className="social-pill">
                <LinkedInIcon /> LinkedIn
              </a>
              <a href={`mailto:${links.email}`} className="social-pill">
                <MailIcon /> Email
              </a>
            </div>
            <dl className="hero-stats">
              {stats.map((s) => (
                <div key={s.label} className="hero-stat">
                  <dt>{s.label}</dt>
                  <dd>
                    <CountUp to={s.value} />
                    {s.label === "Technologies" && "+"}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <HeroCode />
        </div>
      </div>

      <a href="#about" className="scroll-cue" aria-label="Scroll to About">
        <span className="scroll-mouse" aria-hidden="true"><i /></span>
        <span>scroll</span>
      </a>
    </section>
  );
}
