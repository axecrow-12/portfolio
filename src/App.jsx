import { useEffect, useRef, useState } from "react";
import "./App.css";

const projects = [
  {
    title: "LocationTracker",
    description:
      "Android application for GPS tracking, geofencing, push notifications, and Google Maps navigation. Implements real-time location updates with background service support.",
    tech: ["Java", "Android", "Room", "Google Maps API"],
    status: "Built",
    statusClass: "badge-built",
    github: "https://github.com/axecrow-12/LocationTracker",
    category: ["Android", "Java"],
  },
  {
    title: "KuraVizor",
    description:
      "Offline-first farm intelligence platform designed for low-connectivity environments. Provides practical agricultural analytics, crop tracking, and decision support with full offline capability.",
    tech: ["TypeScript", "React", "PostgreSQL", "Prisma"],
    status: "In Progress",
    statusClass: "badge-progress",
    github: "https://github.com/axecrow-12/kuravisor",
    category: ["Web", "TypeScript", "React"],
  },
  {
    title: "Agrovia 2.0",
    description:
      "Collaborative agriculture platform enabling farmer coordination, resource sharing, market access, and analytics. Designed to connect smallholder farmers with tools for collective growth.",
    tech: ["React", "Spring Boot", "MySQL"],
    status: "Concept + Build",
    statusClass: "badge-concept",
    github: "https://github.com/axecrow-12/Agrovia_2.0",
    category: ["Web", "React", "Java"],
  },
];

const skills = [
  { name: "Android Development (Java)", pct: 85 },
  { name: "React / TypeScript", pct: 78 },
  { name: "Spring Boot / Backend", pct: 72 },
  { name: "Database Design (SQL)", pct: 80 },
  { name: "REST API Development", pct: 82 },
  { name: "Git & Version Control", pct: 88 },
];

const chips = [
  "Java", "TypeScript", "JavaScript", "React", "Spring Boot",
  "Node.js", "Android SDK", "Room Database", "PostgreSQL", "MySQL",
  "Prisma ORM", "REST APIs", "Git & GitHub", "Google Maps API", "Gradle",
];

const certifications = [
  { icon: "🎓", text: "BTech Software Engineering — Harare Institute of Technology (current)" },
  { icon: "📱", text: "Hands-on Android Development — LocationTracker & GPS Systems" },
  { icon: "🌐", text: "Full-Stack Web Development — React, Spring Boot, Node.js" },
  { icon: "🗄️", text: "Database Design & REST API Development — MySQL, PostgreSQL, Prisma" },
  { icon: "🌾", text: "Agri-tech Solutions — KuraVizor Offline-First Platform" },
  { icon: "🔧", text: "Version Control & Collaborative Development — Git & GitHub" },
];

const allTags = ["All", ...new Set(projects.flatMap((p) => p.category))];

const phrases = [
  "building offline-first platforms",
  "solving real problems with code",
  "developing Android applications",
  "engineering for impact",
];

function useTypewriter() {
  const [text, setText] = useState("");
  const state = useRef({ pi: 0, ci: 0, deleting: false });

  useEffect(() => {
    let timeout;
    function step() {
      const { pi, ci, deleting } = state.current;
      const phrase = phrases[pi];
      if (!deleting) {
        const next = ci + 1;
        setText(phrase.slice(0, next));
        state.current.ci = next;
        if (next === phrase.length) {
          state.current.deleting = true;
          timeout = setTimeout(step, 1800);
        } else {
          timeout = setTimeout(step, 90);
        }
      } else {
        const next = ci - 1;
        setText(phrase.slice(0, next));
        state.current.ci = next;
        if (next === 0) {
          state.current.deleting = false;
          state.current.pi = (pi + 1) % phrases.length;
        }
        timeout = setTimeout(step, 55);
      }
    }
    timeout = setTimeout(step, 600);
    return () => clearTimeout(timeout);
  }, []);

  return text;
}

function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.body.scrollHeight - window.innerHeight;
      setProgress(h > 0 ? (window.scrollY / h) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return progress;
}

function SkillBar({ name, pct }) {
  const ref = useRef(null);
  const [filled, setFilled] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setFilled(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="skill-item" ref={ref}>
      <div className="skill-meta">
        <span className="skill-name">{name}</span>
        <span className="skill-pct">{pct}%</span>
      </div>
      <div className="skill-track">
        <div
          className="skill-fill"
          style={{ width: filled ? `${pct}%` : "0%" }}
        />
      </div>
    </div>
  );
}

export default function App() {
  const typedText = useTypewriter();
  const scrollProgress = useScrollProgress();
  const [activeFilter, setActiveFilter] = useState("All");

  useScrollReveal();

  const filtered =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.category.includes(activeFilter));

  return (
    <div className="site-shell">
      {/* Scroll progress */}
      <div
        className="progress-bar"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Grid background */}
      <div className="grid-bg" aria-hidden="true" />

      {/* NAV */}
      <nav className="site-nav">
        <div className="nav-inner container">
          <a href="#home" className="brand">
            Wilmar<span>.dev</span>
          </a>
          <div className="nav-links">
            <a href="#about">About</a>
            <a href="#projects">Projects</a>
            <a href="#certifications">Education</a>
            <a href="#contact">Contact</a>
          </div>
          <a href="/Wilmar-CV.pdf" className="btn nav-cta">
            Download CV
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section id="home" className="hero-section">
        <div className="container">
          <div className="hero-grid">
            <div className="reveal visible" style={{ transitionDelay: "0.05s" }}>
              <p className="eyebrow">BTech Software Engineering Student</p>
              <h1 className="hero-title">
                Hi, I'm <span className="name">Wilmar</span>
                <br />
                <span className="line2">
                  I build software that
                  <br />
                  solves real problems.
                </span>
              </h1>
              <div className="terminal-line">
                <span className="prompt">$</span>
                <span>{typedText}</span>
                <span className="cursor" aria-hidden="true" />
              </div>
              <p className="hero-text">
                Software Engineering student at Harare Institute of Technology,
                focused on mobile systems, full-stack development, and
                agricultural technology — building practical tools with
                measurable impact.
              </p>
              <div className="hero-actions">
                <a href="#projects" className="btn btn-primary">
                  View Projects
                </a>
                <a href="#contact" className="btn btn-outline">
                  Contact Me
                </a>
                <a href="/Wilmar-CV.pdf" className="btn btn-outline">
                  Download CV ↓
                </a>
              </div>
              <div className="social-strip">
                <a
                  href="https://github.com/axecrow-12"
                  target="_blank"
                  rel="noreferrer"
                  className="social-pill"
                >
                  ⌥ GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/wilmar-macheke-597934352"
                  target="_blank"
                  rel="noreferrer"
                  className="social-pill"
                >
                  in LinkedIn
                </a>
                <a href="mailto:axecrow12@gmail.com" className="social-pill">
                  ✉ Email
                </a>
              </div>
            </div>

            <div
              className="glass-card profile-card reveal visible"
              style={{ transitionDelay: "0.15s" }}
            >
              <div className="avatar-box">W</div>
              <h2 className="profile-label">Quick Profile</h2>
              <div className="profile-list">
                <div className="profile-item">
                  <p className="label">Focus</p>
                  <p>Mobile apps, backend systems, agri-tech</p>
                </div>
                <div className="profile-item">
                  <p className="label">Based in</p>
                  <p>Harare, Zimbabwe 🇿🇼</p>
                </div>
                <div className="profile-item">
                  <p className="label">Currently building</p>
                  <p>KuraVizor — offline-first farm intelligence</p>
                </div>
                <div className="profile-item">
                  <p className="label">Open to</p>
                  <p>Internships · Collaborations · Projects</p>
                </div>
              </div>
              <div className="status-dot">Available for opportunities</div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="section">
        <div className="container">
          <p className="section-tag">Background</p>
          <h2 className="section-title">About Me</h2>
          <div className="two-col">
            <div className="glass-card reveal">
              <h3>Who I am</h3>
              <p className="about-text">
                I'm a Software Engineering student at Harare Institute of
                Technology with a passion for building technology that creates
                visible, real-world impact. My work spans Android development,
                full-stack web applications, geolocation systems, and
                agricultural technology — with a particular interest in
                solutions designed for low-connectivity and
                resource-constrained environments.
              </p>
              <br />
              <p className="about-text">
                I enjoy the intersection of engineering precision and
                human-centred design: systems that are not just technically
                sound, but genuinely useful to the people who depend on them.
              </p>
            </div>
            <div className="glass-card reveal">
              <h3>Technical Skills</h3>
              <div className="skill-row">
                {skills.map((s) => (
                  <SkillBar key={s.name} name={s.name} pct={s.pct} />
                ))}
              </div>
            </div>
          </div>
          <div style={{ height: "1.5rem" }} />
          <div className="glass-card reveal">
            <h3>Technologies I work with</h3>
            <div className="chip-wrap">
              {chips.map((c) => (
                <span key={c} className="chip">
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="section" style={{ paddingTop: "2rem" }}>
        <div className="container">
          <p className="section-tag">Portfolio</p>
          <h2 className="section-title">Featured Projects</h2>

          {/* Filter buttons */}
          <div className="filter-row">
            {allTags.map((tag) => (
              <button
                key={tag}
                className={`filter-btn${activeFilter === tag ? " active" : ""}`}
                onClick={() => setActiveFilter(tag)}
              >
                {tag}
              </button>
            ))}
          </div>

          <div className="projects-grid">
            {filtered.map((p, i) => (
              <div
                key={p.title}
                className="project-card reveal"
                style={{ transitionDelay: `${i * 0.08}s` }}
              >
                <div className="project-top">
                  <h4>{p.title}</h4>
                  <span className={`status-badge ${p.statusClass}`}>
                    {p.status}
                  </span>
                </div>
                <p className="project-desc">{p.description}</p>
                <div className="tech-wrap">
                  {p.tech.map((t) => (
                    <span key={t} className="tech-pill">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="project-actions">
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-outline btn-sm"
                  >
                    View on GitHub ↗
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CERTIFICATIONS */}
      <section
        id="certifications"
        className="section"
        style={{ paddingTop: "2rem" }}
      >
        <div className="container">
          <p className="section-tag">Education</p>
          <h2 className="section-title">Education & Background</h2>
          <div className="cert-grid">
            {certifications.map((c, i) => (
              <div
                key={i}
                className="cert-card reveal"
                style={{ transitionDelay: `${i * 0.07}s` }}
              >
                <div className="cert-icon">{c.icon}</div>
                <span>{c.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="section" style={{ paddingTop: "2rem" }}>
        <div className="container">
          <div className="contact-panel reveal">
            <h3>Let's build something together</h3>
            <p>
              Open to internships, collaborations, and projects in Android
              development, backend engineering, agri-tech, and offline-first
              systems. Don't hesitate to reach out.
            </p>
            <div className="contact-actions">
              <a href="mailto:axecrow12@gmail.com" className="btn btn-light">
                ✉ axecrow12@gmail.com
              </a>
              <a
                href="https://github.com/axecrow-12"
                target="_blank"
                rel="noreferrer"
                className="btn btn-outline"
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/wilmar-macheke-597934352"
                target="_blank"
                rel="noreferrer"
                className="btn btn-outline"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="site-footer">
        <div className="container footer-row">
          <p>© 2026 Wilmar Macheke · Built with React & Framer Motion</p>
          <div className="footer-links">
            <a
              href="https://github.com/axecrow-12"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/wilmar-macheke-597934352"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
            <a href="mailto:axecrow12@gmail.com">Email</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
