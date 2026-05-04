import { useMemo, useState } from "react";
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
    <div className="pf-app-bg">
      <main className="pf-page">
        <header className="pf-topbar">
          <div className="pf-topbar-inner">
            <div className="pf-brand">
              <h1>{profile.name}</h1>
              <p className="pf-brand-sub">{profile.title}</p>
            </div>
            <div className="pf-topbar-actions">
              {profile.links.map((link) => (
                <a
                  key={link.url}
                  className="pf-nav-link"
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
        </header>

        <section id="work" aria-labelledby="work-heading">
          <h2 id="work-heading" className="sr-only">
            Projects
          </h2>
          <div className="pf-work-shell">
            {projects.length > 0 ? (
              <div className="pf-grid">
                {projects.map((project) => (
                  <button
                    key={project.id}
                    type="button"
                    className="pf-card"
                    aria-label={`View ${project.title}`}
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
                      ) : project.id === "album-cover" ||
                        project.id === "final-one-pdf" ? (
                        <img src={publicUrl(project.coverImage)} alt="" loading="lazy" />
                      ) : project.media.kind === "pdf" ? (
                        <iframe
                          className="pf-card-pdf"
                          src={`${publicUrl(project.media.src)}#page=1&view=FitH`}
                          title={`${project.title} preview`}
                          aria-hidden
                        />
                      ) : project.media.kind === "pdfs" &&
                        project.media.files.length > 0 ? (
                        <iframe
                          className="pf-card-pdf"
                          src={`${publicUrl(project.media.files[0].src)}#page=1&view=FitH`}
                          title={`${project.title} preview`}
                          aria-hidden
                        />
                      ) : (
                        <img src={publicUrl(project.coverImage)} alt="" loading="lazy" />
                      )}
                    </div>
                    <h3 className="pf-card-title">{project.title}</h3>
                  </button>
                ))}
              </div>
            ) : (
              <div className="pf-empty">
                <h3>No projects yet</h3>
                <p>
                  Add files to <code>public/images</code>, <code>public/videos</code>, or{" "}
                  <code>public/documents</code>, then paste a project object into{" "}
                  <code>src/data/portfolio.json</code>.
                </p>
                <p>
                  GIFs work directly when used as <code>coverImage</code> (example:{" "}
                  <code>/images/my-loop.gif</code>).
                </p>
                <a
                  className="pf-link-pill"
                  href={publicUrl("/project-template.json")}
                  target="_blank"
                  rel="noreferrer"
                >
                  Open project template
                  <span aria-hidden>↗</span>
                </a>
              </div>
            )}
          </div>
        </section>

        <footer className="pf-footer">
          <span>© {new Date().getFullYear()} {profile.name}</span>
        </footer>

        {open ? (
          <ProjectModal project={open} onClose={() => setOpen(null)} />
        ) : null}
      </main>
    </div>
  );
}
