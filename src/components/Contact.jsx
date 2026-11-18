import { links } from "../data/content.js";
import { GitHubIcon, LinkedInIcon, MailIcon } from "./Icons.jsx";
import Reveal from "./Reveal.jsx";

export default function Contact() {
  return (
    <section id="contact" className="section section-tight">
      <div className="container">
        <Reveal className="contact-panel">
          <h2>Let's build something together</h2>
          <p>
            Open to internships, collaborations, and projects in Android
            development, backend engineering, agri-tech, and offline-first
            systems. Don't hesitate to reach out.
          </p>
          <div className="contact-actions">
            <a href={`mailto:${links.email}`} className="btn btn-light">
              <MailIcon /> {links.email}
            </a>
            <a href={links.github} target="_blank" rel="noreferrer" className="btn btn-outline">
              <GitHubIcon /> GitHub
            </a>
            <a href={links.linkedin} target="_blank" rel="noreferrer" className="btn btn-outline">
              <LinkedInIcon /> LinkedIn
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-row">
        <p>© {new Date().getFullYear()} Wilmar Macheke · Built with React & Vite</p>
        <div className="footer-links">
          <a href={links.github} target="_blank" rel="noreferrer">GitHub</a>
          <a href={links.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          <a href={`mailto:${links.email}`}>Email</a>
        </div>
      </div>
    </footer>
  );
}
