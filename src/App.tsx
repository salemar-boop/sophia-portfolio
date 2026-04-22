import { useMemo, useState, type CSSProperties } from "react";
import raw from "./data/portfolio.json";
import { ProjectModal } from "./components/ProjectModal";
import type { PortfolioData, Project } from "./types";
import { publicUrl } from "./utils/publicUrl";
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
    <div
      className="pf-app-bg"
      style={
        {
          "--cherry-bg-url": `url(${publicUrl("/images/cherry-blossom-bg.png")})`,
        } as CSSProperties
      }
    >
    <div className="pf-page">
      <header className="pf-header">
        <a className="pf-mark" href="#projects">
          {profile.name}
          <span>.</span>
        </a>
        <nav className="pf-nav" aria-label="Primary">
          <a href="#projects">Work</a>
          <a href="#about">About</a>
          {profile.email ? (
            <a href={`mailto:${profile.email}`}>Contact</a>
          ) : null}
        </nav>
      </header>

      <section className="pf-hero" aria-labelledby="intro-heading">
        <div>
          <p className="pf-eyebrow">Portfolio</p>
          <h1 id="intro-heading">
            Graphic design with <em>curiosity</em>, craft, and room to breathe.
          </h1>
          <p className="pf-lede">{profile.title}</p>
        </div>
        <aside className="pf-hero-panel" aria-label="Highlights">
          <p>
            <strong>Featured work:</strong> Webzine through packaging, clock,
            typefaces, Bodoni poster, Fenty lip gloss poster, port PDFs, cookbook
            spread, DSGN 255 magazine, and more—tap a tile; PDFs open in the modal
            with a new-tab link.
          </p>
        </aside>
      </section>

      <section id="projects" aria-labelledby="projects-heading">
        <h2 className="pf-section-title" id="projects-heading">
          Featured <span>work</span>
        </h2>
        <div className="pf-grid">
          {projects.map((project) => (
            <button
              key={project.id}
              type="button"
              className="pf-card pf-ripple"
              onClick={() => setOpen(project)}
            >
              <div className="pf-card-media">
                {project.coverVideo ? (
                  <video
                    src={publicUrl(project.coverVideo)}
                    poster={publicUrl(project.coverImage)}
                    muted
                    loop
                    autoPlay
                    playsInline
                    preload="metadata"
                    aria-hidden
                  />
                ) : (
                  <img
                    src={publicUrl(project.coverImage)}
                    alt=""
                    loading="lazy"
                  />
                )}
                <div className="pf-card-overlay" aria-hidden />
                <div className="pf-card-body">
                  <p className="pf-card-kicker">Open</p>
                  <h3 className="pf-card-title">{project.title}</h3>
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      <section className="pf-about" id="about" aria-labelledby="about-heading">
        <div>
          <h2 id="about-heading">About {profile.name}</h2>
          <p>{profile.bio}</p>
        </div>
        <div>
          <p className="pf-card-kicker" style={{ marginBottom: "0.5rem" }}>
            Connect
          </p>
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

      <footer className="pf-footer">
        <span>© {new Date().getFullYear()} {profile.name}</span>
        <span>Built to stay private until you deploy it.</span>
      </footer>

      {open ? <ProjectModal project={open} onClose={() => setOpen(null)} /> : null}
    </div>
    </div>
  );
}
