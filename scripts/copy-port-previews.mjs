/**
 * Copies project art from /port into /public/images with stable, semantic filenames
 * (JPEG / PNG / GIF — no generic preview-* names). Run after adding or changing files in port/:
 *
 *   npm run copy-port
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

/** [source under repo root, destination under repo root] */
const pairs = [
  // Once Upon a Broken Heart Clock
  ["port/clock-gif.gif", "public/images/ouabh-clock.gif"],
  // Pokemon playthrough (card + video poster)
  ["port/FINAL TURN IN 2.jpg", "public/images/pokemon-playthrough-poster.jpg"],
  // Album cover (PDF companion)
  ["port/album.png", "public/images/album-cover.png"],
  // Type poster + spreads
  ["port/look poster.png", "public/images/type-poster-hero.png"],
  ["port/final final 2.png", "public/images/type-poster-slide-2.png"],
  ["port/final final 3.png", "public/images/type-poster-slide-3.png"],
  // Hot sauce labels
  ["port/whimpy image.jpg", "public/images/hot-sauce-whimpy.jpg"],
  ["port/VELVET IMAGE.jpg", "public/images/hot-sauce-velvet.jpg"],
  // Postcards
  ["port/postcard-gif.gif", "public/images/postcards-art.gif"],
  // Custom typefaces (Word Final companion)
  ["port/1765297838.013812.jpg", "public/images/custom-typefaces-cover.jpg"],
  // Pattern series (card art — PDFs stay in /documents)
  ["port/icons.png", "public/images/pattern-series-cover.png"],
  // Cookbook
  ["port/cookbook.png", "public/images/cookbook-cover.png"],
  // Lip poster GIF
  ["port/lip-poster-gif.gif", "public/images/lip-poster.gif"],
  // Icons project (PDF companion)
  ["port/icons real.png", "public/images/icons-project-cover.png"],
  ["port/icons.jpg", "public/images/icons-project-photo.jpg"],
  // Standalone pieces
  ["port/bubblegum work.png", "public/images/bubblegum.png"],
  ["port/color.png", "public/images/color-study.png"],
  ["port/mag.png", "public/images/magazine-layout.png"],
  ["port/sophia-zg.gif", "public/images/sophia-zg.gif"],
];

let copied = 0;
for (const [relFrom, relTo] of pairs) {
  const from = path.join(root, relFrom);
  const to = path.join(root, relTo);
  if (!fs.existsSync(from)) {
    console.warn(`[copy-port] missing source, skip: ${relFrom}`);
    continue;
  }
  fs.mkdirSync(path.dirname(to), { recursive: true });
  fs.copyFileSync(from, to);
  copied += 1;
}
console.log(`[copy-port] copied ${copied} file(s) into public/images/`);
