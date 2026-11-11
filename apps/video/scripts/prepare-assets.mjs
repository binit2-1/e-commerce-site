// Copies the site's own fonts and images into public/ so the video uses the real brand assets.
import { copyFileSync, mkdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const web = path.resolve(here, "../../web/src/assets");
const pub = path.resolve(here, "../public");

const files = {
  fonts: ["Satoshi-Regular.ttf", "Satoshi-Medium.ttf", "Satoshi-Bold.ttf", "PPNeueMontreal-Bold.otf"],
  imgs: ["landingImage.png", "star.png"],
};
for (const [dir, list] of Object.entries(files)) {
  const target = path.join(pub, dir === "imgs" ? "img" : dir);
  mkdirSync(target, { recursive: true });
  for (const f of list) copyFileSync(path.join(web, dir, f), path.join(target, f));
}
console.log("assets copied to", pub);
