import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Use "./" so production assets use relative URLs (works on GitHub Pages project
// sites and avoids blank pages when the app is not served from domain root).
// If you ever deploy to a custom subpath with a fixed name, you can set e.g.
// base: "/sophia-portfolio/" instead and keep using publicUrl() for JSON paths.
export default defineConfig({
  base: "./",
  plugins: [react()],
});
