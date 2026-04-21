/**
 * Prefixes paths from `public/` (e.g. `/images/photo.png`) with Vite's `base`
 * so the site works when hosted under a subpath (e.g. GitHub Pages `/repo/`).
 */
export function publicUrl(path: string): string {
  if (!path || path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  const clean = path.replace(/^\/+/, "");
  const rawBase = import.meta.env.BASE_URL;
  const base = rawBase.endsWith("/") ? rawBase.slice(0, -1) : rawBase;
  if (!base) return `/${clean}`;
  return `${base}/${clean}`.replace(/\/{2,}/g, "/");
}
