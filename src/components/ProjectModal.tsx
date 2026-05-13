import { useEffect, useId, useRef, useState } from "react";
import type { Project } from "../types";
import { toEmbedSrc } from "../utils/embed";
import { publicUrl } from "../utils/publicUrl";

type Props = {
  project: Project;
  onClose: () => void;
};

function dedupeSources(sources: string[]) {
  return sources.filter((src, i, arr) => arr.indexOf(src) === i);
}

export function ProjectModal({ project, onClose }: Props) {
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const thumbSources = dedupeSources([project.coverImage, ...project.gallery]);
  const [activeIndex, setActiveIndex] = useState(0);

  const sidebarCopy =
    project.about?.trim() || project.description;

  useEffect(() => {
    setActiveIndex(0);
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

  const mediaKind = project.media.kind;
  const hasVideoOrEmbed = mediaKind === "video" || mediaKind === "embed";
  const hasPdf = mediaKind === "pdf";
  const hasPdfs = mediaKind === "pdfs";

  const pdfSrc =
    mediaKind === "pdf" ? publicUrl(project.media.src) : "";

  const activeImageUrl = publicUrl(
    thumbSources[activeIndex] ?? project.coverImage
  );

  const pdfUsesImageHero =
    hasPdf &&
    (project.gallery.length > 0 || thumbSources.length > 1);

  const showThumbStrip =
    thumbSources.length > 1 &&
    (mediaKind === "none" || (hasPdf && pdfUsesImageHero));

  const renderVisual = () => {
    if (mediaKind === "video") {
      return (
        <video
          className="pf-modal-hero-media pf-video"
          src={publicUrl(project.media.src)}
          poster={
            project.media.poster
              ? publicUrl(project.media.poster)
              : publicUrl(project.coverImage)
          }
          controls
          playsInline
        />
      );
    }

    if (mediaKind === "embed") {
      return (
        <div className="pf-embed pf-modal-hero-embed">
          <iframe
            title={`${project.title} video`}
            src={toEmbedSrc(project.media.src)}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      );
    }

    if (mediaKind === "pdfs") {
      return (
        <img
          className="pf-modal-hero-media pf-modal-hero-img"
          src={publicUrl(project.coverImage)}
          alt=""
        />
      );
    }

    if (hasPdf && pdfUsesImageHero) {
      return (
        <img
          className="pf-modal-hero-media pf-modal-hero-img"
          src={activeImageUrl}
          alt=""
        />
      );
    }

    if (hasPdf) {
      return (
        <img
          className="pf-modal-hero-media pf-modal-hero-img"
          src={publicUrl(project.coverImage)}
          alt=""
        />
      );
    }

    if (mediaKind === "none") {
      return (
        <img
          className="pf-modal-hero-media pf-modal-hero-img"
          src={activeImageUrl}
          alt=""
        />
      );
    }

    return null;
  };

  return (
    <div className="pf-modal-root" role="presentation">
      <button
        type="button"
        className="pf-modal-backdrop"
        aria-label="Close project"
        onClick={onClose}
      />
      <div
        className="pf-modal pf-modal--split"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <button
          ref={closeRef}
          type="button"
          className="pf-modal-close pf-modal-close--floating"
          aria-label="Close"
          onClick={onClose}
        >
          ✕
        </button>

        <div className="pf-modal-split">
          <div className="pf-modal-visual">{renderVisual()}</div>

          <aside className="pf-modal-aside" aria-label="Project details">
            <h2 id={titleId} className="pf-modal-aside-title">
              {project.title}
            </h2>
            <p className="pf-modal-tagline">{project.tagline}</p>
            <p className="pf-modal-about">{sidebarCopy}</p>

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

            {mediaKind === "pdf" ? (
              <p className="pf-modal-live">
                <a
                  className="pf-modal-cta"
                  href={pdfSrc}
                  target="_blank"
                  rel="noreferrer"
                >
                  Open PDF
                  <span aria-hidden>↗</span>
                </a>
              </p>
            ) : null}

            {mediaKind === "pdfs" ? (
              <div
                className="pf-modal-live pf-modal-live--cluster"
                role="group"
                aria-label="Open PDFs in a new tab"
              >
                {project.media.files.map((file) => (
                  <a
                    key={file.src}
                    className="pf-modal-cta"
                    href={publicUrl(file.src)}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Open {file.label}
                    <span aria-hidden>↗</span>
                  </a>
                ))}
              </div>
            ) : null}

            {showThumbStrip ? (
              <div className="pf-thumbs" aria-label="Gallery">
                {thumbSources.map((src, i) => (
                  <button
                    key={src}
                    type="button"
                    className="pf-thumb"
                    onClick={() => setActiveIndex(i)}
                    aria-pressed={i === activeIndex}
                  >
                    <img src={publicUrl(src)} alt="" />
                  </button>
                ))}
              </div>
            ) : null}
          </aside>
        </div>
      </div>
    </div>
  );
}
