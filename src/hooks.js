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
