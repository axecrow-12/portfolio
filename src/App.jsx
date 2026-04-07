import "./App.css";
import { motion } from "framer-motion";

export default function App() {
  const projects = [
    {
      title: "LocationTracker",
      description:
        "Android application for GPS tracking, geofencing, notifications, and Google Maps navigation.",
      tech: ["Java", "Android", "Room", "Google Maps API"],
      status: "Built",
      github: "https://github.com/axecrow-12/LocationTracker",
    },
    {
      title: "KuraVizor",
      description:
        "Offline-first farm intelligence platform focused on low-connectivity environments and practical agricultural support.",
      tech: ["TypeScript", "React", "PostgreSQL", "Prisma"],
      status: "In Progress",
      github: "https://github.com/axecrow-12/kuravisor",
    },
    {
      title: "Agrovia",
      description:
        "Collaborative agriculture platform for farmer coordination, resource sharing, market access, and analytics.",
      tech: ["React", "Spring Boot", "MySQL"],
      status: "Concept + Build",
      github: "https://github.com/axecrow-12/Agrovia_2.0",
    },
  ];

  const skills = [
    "Java",
    "Android Development",
    "React",
    "Spring Boot",
    "Node.js",
    "MySQL",
    "PostgreSQL",
    "Prisma",
    "Git & GitHub",
    "REST APIs",
  ];

  const certifications = [
    "BTech Software Engineering Student - Harare Institute of Technology",
    "Hands-on Android Development Projects",
    "Full-Stack Web Development Practice",
    "Database Design and REST API Development",
  ];

  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="site-shell">
      <header className="site-header">
        <div className="container nav-row">
          <a href="#home" className="brand">
            Wilmar<span>.dev</span>
          </a>

          <nav className="nav-links">
            <a href="#about">About</a>
            <a href="#projects">Projects</a>
            <a href="#certifications">Certifications</a>
            <a href="#contact">Contact</a>
          </nav>

          <a href="/Wilmar-CV.pdf" className="btn btn-outline">
            Download CV
          </a>
        </div>
      </header>

      <section id="home" className="hero-section">
        <div className="hero-blur hero-blur-one"></div>
        <div className="hero-blur hero-blur-two"></div>

        <div className="container hero-grid">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.6 }}
          >
            <p className="eyebrow">BTech Software Engineering Student</p>

            <h1 className="hero-title">
              Hi, I’m <span>Wilmar</span> I build practical software that solves
              real problems.
            </h1>

            <p className="hero-text">
              I’m a Software Engineering student at Harare Institute of Technology
              focused on mobile systems, full-stack development, backend logic,
              and technology solutions with real-world impact.
            </p>

            <div className="hero-actions">
              <a href="#projects" className="btn btn-primary">
                View Projects
              </a>
              <a href="#contact" className="btn btn-outline">
                Contact Me
              </a>
              <a href="/Wilmar-CV.pdf" className="btn btn-outline">
                Download CV
              </a>
            </div>

            <div className="social-strip">
              <a
                href="https://github.com/axecrow-12"
                target="_blank"
                rel="noreferrer"
                className="social-pill"
              >
                Code Portfolio
              </a>

              <a
                href="https://www.linkedin.com/in/wilmar-macheke-597934352?utm_source=share_via&utm_content=profile&utm_medium=member_android"
                target="_blank"
                rel="noreferrer"
                className="social-pill"
              >
                Professional Profile
              </a>
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.7, delay: 0.15 }}
            className="glass-card profile-card"
          >
            <div className="avatar-box">W</div>
            <h2>Quick Profile</h2>

            <div className="profile-list">
              <div>
                <p className="label">Focus</p>
                <p>Mobile apps, backend systems, and agri-tech solutions</p>
              </div>

              <div>
                <p className="label">Based in</p>
                <p>Harare, Zimbabwe</p>
              </div>

              <div>
                <p className="label">Currently building</p>
                <p>Offline-first and geolocation-based software projects</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="about" className="section">
        <div className="container two-col">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
            className="glass-card"
          >
            <h3>About Me</h3>
            <p>
              I enjoy designing and developing software that solves visible
              problems. My interests include Android development, full-stack web
              apps, geolocation systems, and agricultural technology platforms
              that create measurable impact.
            </p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="glass-card"
          >
            <h3>Skills</h3>
            <div className="chip-wrap">
              {skills.map((skill) => (
                <span key={skill} className="chip">
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section id="projects" className="section">
        <div className="container">
          <div className="section-head">
            <p className="section-tag">Portfolio</p>
            <h3>Featured Projects</h3>
          </div>

          <div className="projects-grid">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="glass-card project-card"
              >
                <div className="project-top">
                  <h4>{project.title}</h4>
                  <span className="status-badge">{project.status}</span>
                </div>

                <p className="project-description">{project.description}</p>

                <div className="tech-wrap">
                  {project.tech.map((item) => (
                    <span key={item} className="tech-pill">
                      {item}
                    </span>
                  ))}
                </div>

                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-outline project-link"
                >
                  View Project
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="certifications" className="section">
        <div className="container">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55 }}
            className="glass-card"
          >
            <div className="section-head">
              <p className="section-tag">Background</p>
              <h3>Education & Certifications</h3>
            </div>

            <div className="cert-grid">
              {certifications.map((item) => (
                <div key={item} className="cert-card">
                  {item}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section id="contact" className="section">
        <div className="container">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55 }}
            className="contact-panel"
          >
            <h3>Let’s connect</h3>
            <p>
              I’m open to internships, collaborations, and software projects
              involving Android, backend development, agri-tech, and practical
              digital systems.
            </p>

            <div className="contact-actions">
              <a href="mailto:axecrow12@gmail.com" className="btn btn-light">
                axecrow12@gmail.com
              </a>

              <a
                href="https://github.com/axecrow-12"
                target="_blank"
                rel="noreferrer"
                className="btn btn-outline"
              >
                Code Portfolio
              </a>

              <a
                href="https://www.linkedin.com/in/wilmar-macheke-597934352?utm_source=share_via&utm_content=profile&utm_medium=member_android"
                target="_blank"
                rel="noreferrer"
                className="btn btn-outline"
              >
                LinkedIn Profile
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <footer className="site-footer">
        <div className="container footer-row">
          <p>© 2026 Wilmar Macheke. Built with React and Framer Motion.</p>
          <div className="footer-links">
            <a
              href="https://github.com/axecrow-12"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/wilmar-macheke-597934352?utm_source=share_via&utm_content=profile&utm_medium=member_android"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}