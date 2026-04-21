/**
 * Accepts YouTube watch/share URLs or an existing embed URL and returns a safe embed src.
 */
export function toEmbedSrc(input: string): string {
  const trimmed = input.trim();
  if (trimmed.includes("youtube.com/embed/") || trimmed.includes("player.vimeo.com/video/")) {
    return trimmed;
  }

  try {
    const url = new URL(trimmed);
    const host = url.hostname.replace(/^www\./, "");

    if (host === "youtu.be") {
      const id = url.pathname.replace("/", "");
      return id ? `https://www.youtube.com/embed/${id}` : trimmed;
    }

    if (host === "youtube.com" || host === "m.youtube.com") {
      const v = url.searchParams.get("v");
      if (v) {
        return `https://www.youtube.com/embed/${v}`;
      }
    }

    if (host === "vimeo.com") {
      const parts = url.pathname.split("/").filter(Boolean);
      const id = parts[0] === "video" ? parts[1] : parts[0];
      if (id && /^\d+$/.test(id)) {
        return `https://player.vimeo.com/video/${id}`;
      }
    }
  } catch {
    /* not a URL */
  }

  return trimmed;
}
