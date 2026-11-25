import { useEffect, useRef, useState } from "react";

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function useTypewriter(phrases) {
  const [text, setText] = useState(() =>
    prefersReducedMotion() ? phrases[0] : ""
  );
  const state = useRef({ pi: 0, ci: 0, deleting: false });

  useEffect(() => {
    if (prefersReducedMotion()) return;
    let timeout;
    function step() {
      const { pi, ci, deleting } = state.current;
      const phrase = phrases[pi];
      const next = deleting ? ci - 1 : ci + 1;
      setText(phrase.slice(0, next));
      state.current.ci = next;
      if (!deleting && next === phrase.length) {
        state.current.deleting = true;
        timeout = setTimeout(step, 1800);
        return;
      }
      if (deleting && next === 0) {
        state.current.deleting = false;
        state.current.pi = (pi + 1) % phrases.length;
      }
      timeout = setTimeout(step, deleting ? 55 : 90);
    }
    timeout = setTimeout(step, 600);
    return () => clearTimeout(timeout);
  }, [phrases]);

  return text;
}

export function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(h > 0 ? (window.scrollY / h) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return progress;
}

// Moves a card's hover glow (.glow-card) to follow the pointer.
export function trackPointer(e) {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
}

const GH_CACHE_KEY = "gh-repos-v1";
const GH_CACHE_MS = 60 * 60 * 1000;

function readCache() {
  try {
    const cached = JSON.parse(sessionStorage.getItem(GH_CACHE_KEY));
    if (cached && Date.now() - cached.at < GH_CACHE_MS) return cached.data;
  } catch {
    // storage unavailable or corrupt: fetch fresh
  }
  return null;
}

function writeCache(data) {
  try {
    sessionStorage.setItem(GH_CACHE_KEY, JSON.stringify({ at: Date.now(), data }));
  } catch {
    // storage unavailable: skip caching
  }
}

// Public profile + repos from the GitHub REST API (unauthenticated,
// cached for an hour per browser session to stay under the rate limit).
export function useGitHubRepos({ user, limit, exclude }) {
  const [state, setState] = useState(() => {
    const cached = readCache();
    return cached ? { status: "ready", ...cached } : { status: "loading" };
  });

  useEffect(() => {
    if (state.status === "ready") return;
    const ctrl = new AbortController();
    const get = (path) =>
      fetch(`https://api.github.com/${path}`, {
        signal: ctrl.signal,
        headers: { Accept: "application/vnd.github+json" },
      }).then((r) => {
        if (!r.ok) throw new Error(`GitHub API ${r.status}`);
        return r.json();
      });

    Promise.all([get(`users/${user}`), get(`users/${user}/repos?per_page=100&type=owner`)])
      .then(([profile, repos]) => {
        const list = repos
          .filter((r) => !r.fork && !r.archived && !exclude.includes(r.name))
          .sort(
            (a, b) =>
              b.stargazers_count - a.stargazers_count ||
              new Date(b.pushed_at) - new Date(a.pushed_at)
          );

        const languages = {};
        for (const r of list) if (r.language) languages[r.language] = (languages[r.language] ?? 0) + 1;

        const data = {
          profile: { repos: profile.public_repos, followers: profile.followers, url: profile.html_url },
          languages: Object.entries(languages).sort((a, b) => b[1] - a[1]),
          repos: list.slice(0, limit).map((r) => ({
            name: r.name,
            description: r.description,
            url: r.html_url,
            language: r.language,
            stars: r.stargazers_count,
            forks: r.forks_count,
            pushedAt: r.pushed_at,
            topics: r.topics ?? [],
          })),
        };
        writeCache(data);
        setState({ status: "ready", ...data });
      })
      .catch((err) => {
        if (err.name !== "AbortError") setState({ status: "error" });
      });

    return () => ctrl.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, limit]);

  return state;
}

// Observes a single element, so anything mounted later (e.g. after a
// project filter change) still gets revealed.
export function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [ref, visible];
}
