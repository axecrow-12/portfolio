import "./App.css";
import { useScrollProgress } from "./hooks.js";
import Nav from "./components/Nav.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Projects from "./components/Projects.jsx";
import Contact, { Footer } from "./components/Contact.jsx";

export default function App() {
  const scrollProgress = useScrollProgress();

  return (
    <div className="site-shell">
      <div
        className="progress-bar"
        style={{ width: `${scrollProgress}%` }}
        aria-hidden="true"
      />
      <div className="grid-bg" aria-hidden="true" />
      <a href="#main" className="skip-link">Skip to content</a>

      <Nav />
      <main id="main">
        <Hero />
        <About />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
