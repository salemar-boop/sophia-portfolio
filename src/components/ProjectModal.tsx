import { useEffect, useId, useRef, useState } from "react";
import type { Project } from "../types";
import { toEmbedSrc } from "../utils/embed";

type Props = {
  project: Project;
  onClose: () => void;
};

export function ProjectModal({ project, onClose }: Props) {
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const thumbSources = [project.coverImage, ...project.gallery].filter(
    (src, i, arr) => arr.indexOf(src) === i
  );
  const [activeImage, setActiveImage] = useState(project.coverImage);

  useEffect(() => {
    setActiveImage(project.coverImage);
  }, [project]);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  useEffect(() => {
    closeRef.current?.focus();
  }, []);

  const hasMotion = project.media.kind === "video" || project.media.kind === "embed";
  const showStills =
    thumbSources.length > 1 || (hasMotion && project.gallery.length > 0);

  return (
    <div className="pf-modal-root" role="presentation">
      <button
        type="button"
        className="pf-modal-backdrop"
        aria-label="Close project"
        onClick={onClose}
      />
      <div
        className="pf-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <div className="pf-modal-header">
          <div>
            <p className="pf-card-kicker" style={{ marginBottom: "0.25rem" }}>
              Project
            </p>
            <h2 id={titleId}>{project.title}</h2>
          </div>
          <button
            ref={closeRef}
            type="button"
            className="pf-modal-close pf-ripple"
            aria-label="Close"
            onClick={onClose}
          >
            ✕
          </button>
        </div>
        <div className="pf-modal-body">
          <p className="pf-modal-tagline">{project.tagline}</p>

          {project.liveUrl ? (
            <p className="pf-modal-live">
              <a
                className="pf-modal-cta"
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
              >
                Open live site
                <span aria-hidden>↗</span>
              </a>
            </p>
          ) : null}

          {hasMotion ? (
            <div className="pf-modal-stage">
              {project.media.kind === "video" ? (
                <video
                  className="pf-video"
                  src={project.media.src}
                  poster={project.media.poster}
                  controls
                  playsInline
                />
              ) : (
                <div className="pf-embed">
                  <iframe
                    title={`${project.title} video`}
                    src={toEmbedSrc(project.media.src)}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
              )}
            </div>
          ) : (
            <div className="pf-modal-stage">
              <img src={activeImage} alt="" />
            </div>
          )}

          {hasMotion && showStills ? (
            <div
              className="pf-modal-stage"
              style={{ marginTop: "0.85rem", background: "#030303" }}
            >
              <img
                src={activeImage}
                alt=""
                style={{ maxHeight: "min(38vh, 360px)", margin: "0 auto" }}
              />
            </div>
          ) : null}

          <p className="pf-modal-copy">{project.description}</p>

          {thumbSources.length > 1 ? (
            <div className="pf-thumbs" aria-label="Gallery">
              {thumbSources.map((src) => (
                <button
                  key={src}
                  type="button"
                  className="pf-thumb pf-ripple"
                  onClick={() => setActiveImage(src)}
                  aria-pressed={src === activeImage}
                >
                  <img src={src} alt="" />
                </button>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
