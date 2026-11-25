import { useState } from "react";
import { projects, statusBadge } from "../data/content.js";
import { ExternalIcon } from "./Icons.jsx";
import ProjectMedia from "./ProjectMedia.jsx";
import Reveal from "./Reveal.jsx";
import TechIcon from "./TechIcon.jsx";
import { trackPointer } from "../hooks.js";

const allTags = ["All", ...new Set(projects.flatMap((p) => p.category))];

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.category.includes(activeFilter));

  return (
    <section id="projects" className="section section-tight">
      <div className="container">
        <p className="section-tag">Portfolio</p>
        <h2 className="section-title">Featured Projects</h2>

        <div className="filter-row" role="group" aria-label="Filter projects by technology">
          {allTags.map((tag) => (
            <button
              key={tag}
              type="button"
              className={`filter-btn${activeFilter === tag ? " active" : ""}`}
              aria-pressed={activeFilter === tag}
              onClick={() => setActiveFilter(tag)}
            >
              {tag}
            </button>
          ))}
        </div>

        <p className="sr-only" aria-live="polite">
          Showing {filtered.length} project{filtered.length === 1 ? "" : "s"}
        </p>

        <div className="projects-grid">
          {filtered.map((p, i) => (
            <Reveal
              as="article"
              key={p.title}
              className="project-card glow-card"
              delay={i * 0.06}
              onPointerMove={trackPointer}
            >
              <ProjectMedia project={p} />
              <div className="project-body">
                <div className="project-top">
                  <h3>{p.title}</h3>
                  <span className={`status-badge ${statusBadge[p.status]}`}>
                    {p.status}
                  </span>
                </div>
                <p className="project-desc">{p.description}</p>
                <ul className="tech-wrap" aria-label="Technologies">
                  {p.tech.map((t) => (
                    <li key={t} className="tech-pill">
                      <TechIcon name={t} size={13} />
                      {t}
                    </li>
                  ))}
                </ul>
                {(p.live || p.github) && (
                  <div className="project-actions">
                    {p.live && (
                      <a href={p.live} target="_blank" rel="noreferrer" className="btn btn-primary btn-sm">
                        Visit Site <ExternalIcon />
                      </a>
                    )}
                    {p.github && (
                      <a href={p.github} target="_blank" rel="noreferrer" className="btn btn-outline btn-sm">
                        View on GitHub <ExternalIcon />
                      </a>
                    )}
                  </div>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
