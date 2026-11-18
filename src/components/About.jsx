import { education, skillGroups } from "../data/content.js";
import Reveal from "./Reveal.jsx";

export default function About() {
  return (
    <>
      <section id="about" className="section">
        <div className="container">
          <p className="section-tag">Background</p>
          <h2 className="section-title">About Me</h2>
          <div className="two-col">
            <Reveal className="glass-card">
              <h3>Who I am</h3>
              <p className="about-text">
                I'm a Software Engineering student at Harare Institute of
                Technology with a passion for building technology that creates
                visible, real-world impact. My work spans Android development,
                full-stack web applications, geolocation systems, and
                agricultural technology — with a particular interest in
                solutions designed for low-connectivity and
                resource-constrained environments.
              </p>
              <p className="about-text">
                I enjoy the intersection of engineering precision and
                human-centred design: systems that are not just technically
                sound, but genuinely useful to the people who depend on them.
              </p>
            </Reveal>
            <Reveal className="glass-card" delay={0.1}>
              <h3>Education</h3>
              <ul className="edu-list">
                {education.map((e) => (
                  <li key={e.title} className="edu-item">
                    <div>
                      <p className="edu-title">{e.title}</p>
                      <p className="edu-place">{e.place}</p>
                    </div>
                    <span className="edu-period">{e.period}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      <section id="skills" className="section section-tight">
        <div className="container">
          <p className="section-tag">Toolkit</p>
          <h2 className="section-title">Skills</h2>
          <div className="skill-grid">
            {skillGroups.map((g, i) => (
              <Reveal key={g.title} className="glass-card skill-group" delay={i * 0.06}>
                <h3>{g.title}</h3>
                <ul className="chip-wrap">
                  {g.items.map((item) => (
                    <li key={item} className="chip">
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
