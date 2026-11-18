import { links, phrases, projects } from "../data/content.js";
import { useTypewriter } from "../hooks.js";
import { DownloadIcon, GitHubIcon, LinkedInIcon, MailIcon } from "./Icons.jsx";

const inProgress = projects
  .filter((p) => p.status === "In Progress")
  .map((p) => p.title)
  .join(" · ");

export default function Hero() {
  const typedText = useTypewriter(phrases);

  return (
    <section id="home" className="hero-section">
      <div className="container">
        <div className="hero-grid">
          <div>
            <p className="eyebrow">BTech Software Engineering Student</p>
            <h1 className="hero-title">
              Hi, I'm <span className="name">Wilmar</span>
              <span className="line2">
                I build software that solves real problems.
              </span>
            </h1>
            <p className="sr-only">I enjoy {phrases.join(", ")}.</p>
            <div className="terminal-line" aria-hidden="true">
              <span className="prompt">$</span>
              <span>{typedText}</span>
              <span className="cursor" />
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
          </div>

          <aside className="glass-card profile-card" aria-label="Quick profile">
            <div className="avatar-box" aria-hidden="true">W</div>
            <h2 className="profile-label">Quick Profile</h2>
            <dl className="profile-list">
              <div className="profile-item">
                <dt className="label">Focus</dt>
                <dd>Mobile apps, backend systems, agri-tech</dd>
              </div>
              <div className="profile-item">
                <dt className="label">Based in</dt>
                <dd>Harare, Zimbabwe</dd>
              </div>
              <div className="profile-item">
                <dt className="label">Currently building</dt>
                <dd>{inProgress}</dd>
              </div>
              <div className="profile-item">
                <dt className="label">Open to</dt>
                <dd>Internships · Collaborations · Projects</dd>
              </div>
            </dl>
            <div className="status-dot">Available for opportunities</div>
          </aside>
        </div>
      </div>
    </section>
  );
}
