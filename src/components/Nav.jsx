import { links } from "../data/content.js";

export default function Nav() {
  return (
    <nav className="site-nav" aria-label="Main">
      <div className="nav-inner container">
        <a href="#home" className="brand">
          Wilmar<span>.dev</span>
        </a>
        <div className="nav-links">
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </div>
        <a href={links.cv} className="btn nav-cta">
          Download CV
        </a>
      </div>
    </nav>
  );
}
