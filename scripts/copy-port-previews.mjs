/**
 * Copies curated preview assets from /port into /public/images.
 * Run: npm run copy-port
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const pairs = [
  ["port/album.png", "public/images/preview-album.png"],
  ["port/cookbook.png", "public/images/preview-cookbook.png"],
  ["port/look poster.png", "public/images/preview-type-poster.png"],
  ["port/icons real.png", "public/images/preview-icons.png"],
  ["port/icons.png", "public/images/preview-icons-alt.png"],
  ["port/icons.jpg", "public/images/preview-icons-photo.jpg"],
  ["port/FINAL TURN IN 2.jpg", "public/images/preview-pokemon.jpg"],
  ["port/bubblegum work.png", "public/images/preview-bubblegum.png"],
  ["port/color.png", "public/images/preview-color.png"],
  ["port/mag.png", "public/images/preview-magazine.png"],
  ["port/sophia-zg.gif", "public/images/preview-sophia-zg.gif"],
  ["port/whimpy image.jpg", "public/images/preview-hot-whimpy.jpg"],
  ["port/VELVET IMAGE.jpg", "public/images/preview-hot-velvet.jpg"],
  ["port/1765297838.013812.jpg", "public/images/preview-custom-typefaces.jpg"],
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
