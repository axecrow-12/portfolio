import {
  siAndroid,
  siBootstrap,
  siCss,
  siFastapi,
  siFirebase,
  siGit,
  siGithub,
  siGithubactions,
  siGooglemaps,
  siGradle,
  siHtml5,
  siJavascript,
  siJsonwebtokens,
  siLaravel,
  siMysql,
  siNodedotjs,
  siOpenjdk,
  siPhp,
  siPostgresql,
  siPrisma,
  siPython,
  siReact,
  siSpringboot,
  siTailwindcss,
  siTensorflow,
  siTypescript,
  siVite,
} from "simple-icons";

// Relative luminance of a hex colour (0 = black, 1 = white).
function luminance(hex) {
  const [r, g, b] = [0, 2, 4].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

// Brand colours that are too dark for the dark theme get a light tint.
const brand = (icon) => ({
  type: "brand",
  path: icon.path,
  color: luminance(icon.hex) < 0.06 ? "#E2E8F0" : `#${icon.hex}`,
});

// Outline glyphs for technologies without a brand logo (24×24, stroked).
const glyph = (paths, color) => ({ type: "glyph", paths, color });

const glyphs = {
  api: glyph(["M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 1-2 2 2 2 0 0 1 2 2v5a2 2 0 0 0 2 2h1", "M16 21h1a2 2 0 0 0 2-2v-5a2 2 0 0 1 2-2 2 2 0 0 1-2-2V5a2 2 0 0 0-2-2h-1"], "#22D3EE"),
  socket: glyph(["M7 7h10M7 7l3-3M7 7l3 3", "M17 17H7m10 0-3-3m3 3-3 3"], "#A78BFA"),
  database: glyph(["M4 6c0-1.66 3.58-3 8-3s8 1.34 8 3-3.58 3-8 3-8-1.34-8-3Z", "M4 6v12c0 1.66 3.58 3 8 3s8-1.34 8-3V6", "M4 12c0 1.66 3.58 3 8 3s8-1.34 8-3"], "#3DDC84"),
  camera: glyph(["M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3Z", "M12 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"], "#3DDC84"),
  tree: glyph(["M12 3v4", "M12 7 6 12M12 7l6 5", "M6 12l-3 5M6 12l3 5M18 12l-3 5M18 12l3 5"], "#34D399"),
  wallet: glyph(["M19 7V5a2 2 0 0 0-2-2H5a2 2 0 0 0 0 4h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5", "M17 14h.01"], "#22C55E"),
};

// Every technology name used in content.js maps to an icon here.
const icons = {
  Java: brand(siOpenjdk),
  "Android SDK": brand(siAndroid),
  Android: brand(siAndroid),
  Room: glyphs.database,
  "Room Database": glyphs.database,
  CameraX: glyphs.camera,
  "Google Maps API": brand(siGooglemaps),
  Gradle: brand(siGradle),
  React: brand(siReact),
  TypeScript: brand(siTypescript),
  JavaScript: brand(siJavascript),
  "Spring Boot": brand(siSpringboot),
  "Node.js": brand(siNodedotjs),
  PHP: brand(siPhp),
  Laravel: brand(siLaravel),
  "REST APIs": glyphs.api,
  WebSockets: glyphs.socket,
  JWT: brand(siJsonwebtokens),
  PostgreSQL: brand(siPostgresql),
  MySQL: brand(siMysql),
  "Prisma ORM": brand(siPrisma),
  Prisma: brand(siPrisma),
  Firebase: brand(siFirebase),
  Python: brand(siPython),
  FastAPI: brand(siFastapi),
  "TensorFlow Lite": brand(siTensorflow),
  LightGBM: glyphs.tree,
  "EcoCash API": glyphs.wallet,
  HTML: brand(siHtml5),
  CSS: brand(siCss),
  "Bootstrap 5": brand(siBootstrap),
  "Tailwind CSS": brand(siTailwindcss),
  "Git & GitHub": brand(siGithub),
  Git: brand(siGit),
  "GitHub Actions": brand(siGithubactions),
  Vite: brand(siVite),
};

export function getTechIcon(name) {
  return icons[name] ?? null;
}

export function getTechColor(name) {
  return icons[name]?.color ?? "#94A3B8";
}
