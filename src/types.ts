export type PdfFile = { label: string; src: string };

export type ProjectMedia =
  | { kind: "none" }
  | { kind: "video"; src: string; poster?: string }
  | { kind: "embed"; src: string }
  | { kind: "pdf"; src: string }
  /** Multiple PDFs shown together in one project (e.g. companion documents). */
  | { kind: "pdfs"; files: PdfFile[] };

export type Project = {
  id: string;
  title: string;
  tagline: string;
  description: string;
  /** Poster / fallback when `coverVideo` is not used */
  coverImage: string;
  /** Optional looping preview on the project card (muted autoplay) */
  coverVideo?: string;
  /** Opens in a new tab from the project modal */
  liveUrl?: string;
  gallery: string[];
  media: ProjectMedia;
};

export type SiteLink = { label: string; url: string };

export type PortfolioData = {
  profile: {
    name: string;
    title: string;
    bio: string;
    email?: string;
    links: SiteLink[];
  };
  projects: Project[];
};
