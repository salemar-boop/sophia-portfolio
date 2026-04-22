import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Production: GitHub Pages serves this repo at /sophia-portfolio/
// Development: keep base "/" so `npm run dev` opens at http://localhost:5173/
export default defineConfig(({ command }) => ({
  base: command === "build" ? "/sophia-portfolio/" : "/",
  plugins: [react()],
}));
