/**
 * Copies project art from /port into /public/images/projects/ (and one video).
 * Uses JPEG/GIF originals where they exist; PNG only when that is the source file.
 * Run: npm run copy-port
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const pairs = [
  ["port/clock-gif.gif", "public/images/projects/ouabh-clock.gif"],
  ["port/postcard-gif.gif", "public/images/projects/postcards.gif"],
  ["port/lip-poster-gif.gif", "public/images/projects/lip-poster.gif"],
  ["port/sophia-zg.gif", "public/images/projects/sophia-zg.gif"],
  ["port/FINAL TURN IN 2.jpg", "public/images/projects/pokemon-poster.jpg"],
  ["port/20260223-2206-07.5363944 (1).mp4", "public/videos/pokemon-playthrough.mp4"],
  ["port/album.png", "public/images/projects/album-cover.png"],
  ["port/final final pp1.png", "public/images/projects/type-poster-01.png"],
  ["port/final final 2.png", "public/images/projects/type-poster-02.png"],
  ["port/final final 3.png", "public/images/projects/type-poster-03.png"],
  ["port/whimpy image.jpg", "public/images/projects/hot-sauce-whimpy.jpg"],
  ["port/VELVET IMAGE.jpg", "public/images/projects/hot-sauce-velvet.jpg"],
  ["port/patternsgif.gif", "public/images/projects/patternsgif.gif"],
  ["port/cookbook.png", "public/images/projects/cookbook.png"],
  ["port/icons real.png", "public/images/projects/icons-project.png"],
  ["port/icons.jpg", "public/images/projects/icons-project-photo.jpg"],
  ["port/bubblegum work.png", "public/images/projects/bubblegum.png"],
  ["port/color.png", "public/images/projects/color-study.png"],
  ["port/mag.png", "public/images/projects/magazine.png"],
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
console.log(`[copy-port] copied ${copied} file(s).`);
