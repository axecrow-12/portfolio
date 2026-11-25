import { useRef, useState } from "react";
import { getTechColor } from "../data/techIcons.js";
import TechIcon from "./TechIcon.jsx";

// Every image in src/assets/projects/, keyed by file name without extension.
const files = import.meta.glob("../assets/projects/*.{png,jpg,jpeg,webp,avif}", {
  eager: true,
  import: "default",
});
const images = Object.fromEntries(
  Object.entries(files).map(([path, url]) => [path.split("/").pop().replace(/\.\w+$/, ""), url])
);

// <slug>.png, then <slug>-2.png, <slug>-3.png ...
function screenshotsFor(slug) {
  const shots = [];
  if (images[slug]) shots.push(images[slug]);
  for (let i = 2; images[`${slug}-${i}`]; i++) shots.push(images[`${slug}-${i}`]);
  return shots;
}

function hostname(url) {
  try {
    return new URL(url).hostname;
  } catch {
    return null;
  }
}

export default function ProjectMedia({ project }) {
  const shots = screenshotsFor(project.slug);
  const isMobile = project.category.includes("Android");
  const dialogRef = useRef(null);
  const [index, setIndex] = useState(0);

  const open = (i) => {
    setIndex(i);
    dialogRef.current?.showModal();
  };
  const step = (d) => setIndex((i) => (i + d + shots.length) % shots.length);

  if (shots.length === 0) {
    return <Placeholder project={project} />;
  }

  const address =
    hostname(project.live) ??
    (project.github ? `github.com/${project.github.split("github.com/")[1]}` : project.slug);

  return (
    <>
      <button
        type="button"
        className={`media-frame ${isMobile ? "frame-phone" : "frame-browser"}`}
        onClick={() => open(0)}
        aria-label={`View ${project.title} screenshots`}
      >
        {!isMobile && (
          <span className="browser-bar" aria-hidden="true">
            <span className="dots"><i /><i /><i /></span>
            <span className="address">{address}</span>
          </span>
        )}
        <img src={shots[0]} alt={`${project.title} screenshot`} loading="lazy" decoding="async" />
        {shots.length > 1 && <span className="shot-count">+{shots.length - 1}</span>}
      </button>

      <dialog
        ref={dialogRef}
        className="lightbox"
        aria-label={`${project.title} screenshots`}
        onClick={(e) => e.target === dialogRef.current && dialogRef.current.close()}
        onKeyDown={(e) => {
          if (shots.length < 2) return;
          if (e.key === "ArrowRight") step(1);
          if (e.key === "ArrowLeft") step(-1);
        }}
      >
        <div className="lightbox-inner">
          <img src={shots[index]} alt={`${project.title} screenshot ${index + 1} of ${shots.length}`} />
          <div className="lightbox-bar">
            <span>
              {project.title}
              {shots.length > 1 && ` · ${index + 1} / ${shots.length}`}
            </span>
            <div className="lightbox-actions">
              {shots.length > 1 && (
                <>
                  <button type="button" onClick={() => step(-1)} aria-label="Previous screenshot">←</button>
                  <button type="button" onClick={() => step(1)} aria-label="Next screenshot">→</button>
                </>
              )}
              <button type="button" onClick={() => dialogRef.current.close()} aria-label="Close">✕</button>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}

function Placeholder({ project }) {
  const [a, b] = project.tech.map(getTechColor);
  return (
    <div
      className="media-placeholder"
      style={{ "--c1": a, "--c2": b ?? a }}
      aria-hidden="true"
    >
      <div className="placeholder-icons">
        {project.tech.slice(0, 4).map((t) => (
          <span key={t} className="placeholder-icon">
            <TechIcon name={t} size={22} />
          </span>
        ))}
      </div>
      <span className="placeholder-title">{project.title}</span>
    </div>
  );
}
