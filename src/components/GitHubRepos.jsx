import { github, links } from "../data/content.js";
import { trackPointer, useGitHubRepos } from "../hooks.js";
import { ExternalIcon, GitHubIcon } from "./Icons.jsx";
import Reveal from "./Reveal.jsx";

// GitHub's own language colours (github-linguist).
const languageColors = {
  Java: "#b07219",
  Kotlin: "#A97BFF",
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  PHP: "#4F5D95",
  Python: "#3572A5",
  HTML: "#e34c26",
  CSS: "#663399",
  Blade: "#f7523f",
  Dart: "#00B4AB",
  "C#": "#178600",
  Shell: "#89e051",
};
const langColor = (l) => languageColors[l] ?? "#94A3B8";

const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
function timeAgo(iso) {
  const days = Math.round((new Date(iso) - Date.now()) / 86400000);
  if (Math.abs(days) < 30) return rtf.format(days, "day");
  const months = Math.round(days / 30);
  if (Math.abs(months) < 12) return rtf.format(months, "month");
  return rtf.format(Math.round(days / 365), "year");
}

function StarIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M8 .25a.75.75 0 0 1 .67.42l1.88 3.8 4.2.61a.75.75 0 0 1 .41 1.28l-3.04 2.96.72 4.18a.75.75 0 0 1-1.09.79L8 12.33l-3.75 1.97a.75.75 0 0 1-1.09-.79l.72-4.18L.84 6.37a.75.75 0 0 1 .41-1.28l4.2-.61L7.33.67A.75.75 0 0 1 8 .25Z" />
    </svg>
  );
}

function ForkIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M5 5.37v.88c0 .41.34.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.88a2.25 2.25 0 1 1 1.5 0v.88A2.25 2.25 0 0 1 10.25 8.5h-1.5v2.13a2.25 2.25 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.88a2.25 2.25 0 1 1 1.5 0ZM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Zm6.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm-3 8.75a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Z" />
    </svg>
  );
}

export default function GitHubRepos() {
  const data = useGitHubRepos(github);
  const total = data.languages?.reduce((n, [, c]) => n + c, 0) ?? 0;

  return (
    <section id="github" className="section section-tight">
      <div className="container">
        <p className="section-tag">Open Source</p>
        <div className="gh-head">
          <h2 className="section-title">From my GitHub</h2>
          <a href={links.github} target="_blank" rel="noreferrer" className="btn btn-outline btn-sm">
            <GitHubIcon /> @{github.user}
          </a>
        </div>

        {data.status === "loading" && (
          <div className="gh-stats gh-stats-skeleton" aria-hidden="true">
            <div className="gh-stat">
              <strong>&nbsp;</strong>
              <span>public repos</span>
            </div>
            <div className="gh-languages">
              <div className="lang-bar" />
              <ul className="lang-legend"><li>&nbsp;</li></ul>
            </div>
          </div>
        )}

        {data.status === "ready" && (
          <Reveal className="gh-stats">
            <div className="gh-stat">
              <strong>{data.profile.repos}</strong>
              <span>public repos</span>
            </div>
            <div className="gh-languages">
              <div className="lang-bar" aria-hidden="true">
                {data.languages.map(([l, c]) => (
                  <span key={l} style={{ flexGrow: c, background: langColor(l) }} />
                ))}
              </div>
              <ul className="lang-legend" aria-label="Languages across repositories">
                {data.languages.map(([l, c]) => (
                  <li key={l}>
                    <i style={{ background: langColor(l) }} />
                    {l} <span>{Math.round((c / total) * 100)}%</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        )}

        <div className="repo-grid" aria-busy={data.status === "loading"}>
          {data.status === "loading" &&
            Array.from({ length: github.limit }, (_, i) => (
              <div key={i} className="repo-card repo-skeleton" aria-hidden="true">
                <span /><span /><span />
              </div>
            ))}

          {data.status === "error" && (
            <div className="repo-card repo-error">
              <p>Couldn't load repositories from GitHub right now.</p>
              <a href={links.github} target="_blank" rel="noreferrer" className="btn btn-primary btn-sm">
                Browse them on GitHub <ExternalIcon />
              </a>
            </div>
          )}

          {data.status === "ready" &&
            data.repos.map((r, i) => (
              <Reveal
                as="a"
                key={r.name}
                href={r.url}
                target="_blank"
                rel="noreferrer"
                className="repo-card glow-card"
                delay={i * 0.05}
                onPointerMove={trackPointer}
              >
                <div className="repo-top">
                  <span className="repo-name">
                    <GitHubIcon /> {r.name}
                  </span>
                  <ExternalIcon />
                </div>
                <p className="repo-desc">{r.description || "No description yet."}</p>
                <div className="repo-meta">
                  {r.language && (
                    <span>
                      <i className="lang-dot" style={{ background: langColor(r.language) }} />
                      {r.language}
                    </span>
                  )}
                  <span title="Stars"><StarIcon /> {r.stars}</span>
                  <span title="Forks"><ForkIcon /> {r.forks}</span>
                  <span className="repo-updated">Updated {timeAgo(r.pushedAt)}</span>
                </div>
              </Reveal>
            ))}
        </div>
      </div>
    </section>
  );
}
