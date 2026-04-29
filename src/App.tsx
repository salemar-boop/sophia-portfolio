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
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<"all" | "video" | "pdf" | "image">(
    "all",
  );
  const [compactView, setCompactView] = useState(false);
  const projects = useSortedProjects(data.projects);
  const { profile } = data;
  const filterButtons = [
    { id: "all", label: "All" },
    { id: "video", label: "Video" },
    { id: "image", label: "Image" },
    { id: "pdf", label: "PDF" },
  ] as const;

  const filteredProjects = useMemo(() => {
    const search = query.trim().toLowerCase();

    return projects.filter((project) => {
      const matchesSearch =
        search.length === 0 ||
        project.title.toLowerCase().includes(search) ||
        project.tagline.toLowerCase().includes(search) ||
        project.description.toLowerCase().includes(search);

      const matchesMedia =
        activeFilter === "all" ||
        (activeFilter === "video" &&
          (Boolean(project.coverVideo) || project.media.kind === "video")) ||
        (activeFilter === "pdf" &&
          (project.media.kind === "pdf" || project.media.kind === "pdfs")) ||
        (activeFilter === "image" &&
          !project.coverVideo &&
          project.media.kind !== "video" &&
          project.media.kind !== "pdf" &&
          project.media.kind !== "pdfs");

      return matchesSearch && matchesMedia;
    });
  }, [activeFilter, projects, query]);

  function openRandomProject() {
    if (filteredProjects.length === 0) return;
    const randomIndex = Math.floor(Math.random() * filteredProjects.length);
    setOpen(filteredProjects[randomIndex]);
  }

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

        <section id="work" aria-labelledby="work-heading">
          <h2 className="pf-section-title" id="work-heading">
            <span>Projects</span>
          </h2>
          <div className="pf-work-toolbar" aria-label="Project controls">
            <label className="pf-search-wrap" htmlFor="project-search">
              <span aria-hidden>✿</span>
              <input
                id="project-search"
                type="search"
                placeholder="Search projects..."
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </label>
            <div className="pf-filter-row" role="group" aria-label="Filter projects by media">
              {filterButtons.map((filter) => (
                <button
                  key={filter.id}
                  type="button"
                  className={`pf-chip ${activeFilter === filter.id ? "is-active" : ""}`}
                  onClick={() => setActiveFilter(filter.id)}
                >
                  {filter.label}
                </button>
              ))}
            </div>
            <div className="pf-work-actions">
              <button
                type="button"
                className="pf-chip"
                onClick={() => setCompactView((current) => !current)}
              >
                {compactView ? "Comfy view" : "Compact view"}
              </button>
              <button type="button" className="pf-chip pf-chip-surprise" onClick={openRandomProject}>
                Surprise me
              </button>
              <span className="pf-result-count">{filteredProjects.length} shown</span>
            </div>
          </div>
          <div className="pf-work-shell">
            {projects.length > 0 ? (
              <div className={`pf-grid ${compactView ? "pf-grid--compact" : ""}`}>
                {filteredProjects.map((project) => (
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
                          src={publicUrl(project.coverVideo)}
                          poster={publicUrl(project.coverImage)}
                          muted
                          loop
                          autoPlay
                          playsInline
                          preload="metadata"
                          aria-hidden
                        />
                      ) : project.media.kind === "pdf" ? (
                        <iframe
                          className="pf-card-pdf"
                          src={`${publicUrl(project.media.src)}#page=1&view=FitH`}
                          title={`${project.title} preview`}
                          aria-hidden
                        />
                      ) : project.media.kind === "pdfs" && project.media.files.length > 0 ? (
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
            {projects.length > 0 && filteredProjects.length === 0 ? (
              <div className="pf-empty">
                <h3>No matches yet</h3>
                <p>Try another search or switch media filter buttons.</p>
              </div>
            ) : null}

          </div>

          <aside
            className="pf-about pf-intro pf-side-bio"
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
          </aside>
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
