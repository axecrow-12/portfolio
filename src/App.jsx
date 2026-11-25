import { useEffect } from "react";
import "./App.css";
import { useScrollProgress } from "./hooks.js";
import Background from "./components/Background.jsx";
import Nav from "./components/Nav.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Projects from "./components/Projects.jsx";
import GitHubRepos from "./components/GitHubRepos.jsx";
import Contact, { Footer } from "./components/Contact.jsx";

export default function App() {
  const scrollProgress = useScrollProgress();

  // The browser tries to jump to #section before React has rendered it,
  // so honour a deep link (e.g. /#contact) once the page exists.
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (id) document.getElementById(id)?.scrollIntoView({ behavior: "instant" });
  }, []);

  return (
    <div className="site-shell">
      <div
        className="progress-bar"
        style={{ width: `${scrollProgress}%` }}
        aria-hidden="true"
      />
      <Background />
      <a href="#main" className="skip-link">Skip to content</a>

      <Nav />
      <main id="main">
        <Hero />
        <About />
        <Projects />
        <GitHubRepos />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
