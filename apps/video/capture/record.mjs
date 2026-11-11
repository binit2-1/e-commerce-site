// Records every scene of the walkthrough from the running site.
//   1. pnpm db:reset              (fresh demo data, no users)
//   2. start the API and the web app (see README: SHOP_URL defaults to http://localhost:5190)
//   3. pnpm --filter @shop/video capture
// Output: public/clips/<scene>.mp4 and public/clips/manifest.json
import { mkdirSync, writeFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright-core";
import { CURSOR_SCRIPT, createRecorder, makeActor } from "./lib.mjs";
import { desktopScenes, mobileScene } from "./scenes.mjs";

const base = process.env.SHOP_URL ?? "http://localhost:5190";
const chromePath = process.env.CHROME_PATH ?? "/usr/bin/google-chrome";
const here = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.resolve(here, "../public/clips");
const tmpRoot = path.join(os.tmpdir(), "shop-capture");
const only = process.argv[2]?.split(",");

const reachable = await fetch(base + "/api/health").then((r) => r.ok).catch(() => false);
if (!reachable) {
  console.error(`The site is not reachable at ${base} (needs the web app and the API running).`);
  process.exit(1);
}

mkdirSync(outDir, { recursive: true });
const browser = await chromium.launch({ executablePath: chromePath, headless: true, args: ["--hide-scrollbars"] });
const manifest = {};

async function record(context, scene, { touch = false, viewport }) {
  const page = context.pages()[0] ?? (await context.newPage());
  const a = makeActor(page, { touch });
  const rec = await createRecorder(page, { tmpRoot, outDir });
  const ctx = { a, rec, base };
  await scene.prep?.(ctx);
  await rec.start(scene.name);
  await scene.run(ctx);
  manifest[scene.name] = await rec.stop(viewport);
  console.log(`${scene.name}: ${manifest[scene.name].duration.toFixed(1)}s ${manifest[scene.name].width}x${manifest[scene.name].height}`);
}

// Desktop: one browser session for the whole story (guest -> signed up -> logged out -> logged in).
const desktopVp = { width: 1440, height: 810 };
const desktop = await browser.newContext({ viewport: desktopVp, deviceScaleFactor: 1, locale: "en-US" });
await desktop.addInitScript(CURSOR_SCRIPT);
for (const scene of desktopScenes) {
  if (only && !only.includes(scene.name)) continue;
  await record(desktop, scene, { viewport: desktopVp });
}
await desktop.close();

// Phone: its own session (a fresh guest).
if (!only || only.includes("mobile")) {
  const phoneVp = { width: 390, height: 844 };
  const phone = await browser.newContext({ viewport: phoneVp, deviceScaleFactor: 2, isMobile: true, hasTouch: true, locale: "en-US" });
  await phone.addInitScript(CURSOR_SCRIPT);
  await record(phone, mobileScene, { touch: true, viewport: phoneVp });
  await phone.close();
}

await browser.close();
const manifestPath = path.join(outDir, "manifest.json");
let previous = {};
try {
  previous = JSON.parse((await import("node:fs")).readFileSync(manifestPath, "utf8"));
} catch {
  /* first run */
}
writeFileSync(manifestPath, JSON.stringify({ ...previous, ...manifest }, null, 2));
console.log("wrote", manifestPath);
