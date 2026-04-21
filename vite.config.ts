import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Default base is "/". If you deploy to GitHub Pages as a project site
// (https://<user>.github.io/<repo>/), set base to your repo name, e.g.:
//   base: "/sophia-portfolio/",
// then run `npm run build` and publish the `dist` folder.
export default defineConfig({
  plugins: [react()],
});
