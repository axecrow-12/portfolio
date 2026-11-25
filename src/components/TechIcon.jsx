import { getTechIcon } from "../data/techIcons.js";

// Brand logo or outline glyph for a technology. Falls back to the
// technology's initials so a new, unmapped name still renders.
export default function TechIcon({ name, size = 18 }) {
  const icon = getTechIcon(name);

  if (!icon) {
    return (
      <span className="tech-icon-fallback" style={{ width: size, height: size }} aria-hidden="true">
        {name.slice(0, 2)}
      </span>
    );
  }

  if (icon.type === "brand") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill={icon.color} aria-hidden="true" focusable="false">
        <path d={icon.path} />
      </svg>
    );
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={icon.color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {icon.paths.map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}
