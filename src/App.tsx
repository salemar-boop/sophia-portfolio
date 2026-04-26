import { useMemo, useState } from "react";
import raw from "./data/portfolio.json";
import { ProjectModal } from "./components/ProjectModal";
import type { PortfolioData, Project } from "./types";
import "./styles/portfolio.css";

const data = raw as PortfolioData;

function useSortedProjects(projects: Project[]) {
  return useMemo(() => [...projects], [projects]);
}

export default function App() {
  const [open, setOpen] = useState<Project | null>(null);
  const projects = useSortedProjects(data.projects);
  const { profile } = data;

  return (
    <div className="pf-app-bg">
      <div className="pf-page">
        <header className="pf-header">
          <a className="pf-mark" href="#about">
            {profile.name}
            <span>✿</span>
          </a>
          <nav className="pf-nav" aria-label="Primary">
            <a href="#work">Work</a>
            <a href="#about">About</a>
            {profile.email ? (
              <a href={`mailto:${profile.email}`}>Contact</a>
            ) : null}
          </nav>
        </header>

        <section
          className="pf-about pf-intro"
          id="about"
          aria-labelledby="about-heading"
        >
          <div>
            <h1 className="pf-intro-name" id="about-heading">
              {profile.name}
            </h1>
            <p className="pf-intro-title">{profile.title}</p>
            <p className="pf-intro-bio">{profile.bio}</p>
          </div>
          <div>
            <div className="pf-links">
              {profile.links.map((link) => (
                <a
                  key={link.url}
                  className="pf-link-pill"
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  {link.label}
                  <span aria-hidden>↗</span>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section id="work" aria-labelledby="work-heading">
          <h2 className="pf-section-title" id="work-heading">
            <span>Work</span>
          </h2>
          <div className="pf-grid">
            {projects.map((project) => (
              <button
                key={project.id}
                type="button"
                className="pf-card pf-ripple"
                aria-label={`View ${project.title}`}
                onClick={() => setOpen(project)}
              >
                <div className="pf-card-media">
                  {project.coverVideo ? (
                    <video
                      src={project.coverVideo}
                      poster={project.coverImage}
                      muted
                      loop
                      autoPlay
                      playsInline
                      preload="metadata"
                      aria-hidden
                    />
                  ) : (
                    <img src={project.coverImage} alt="" loading="lazy" />
                  )}
                  <div className="pf-card-overlay" aria-hidden />
                  <div className="pf-card-body">
                    <h3 className="pf-card-title">{project.title}</h3>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </section>

        <footer className="pf-footer">
          <span>
            © {new Date().getFullYear()} {profile.name}
          </span>
        </footer>

        {open ? (
          <ProjectModal project={open} onClose={() => setOpen(null)} />
        ) : null}
      </div>
    </div>
  );
}
