// Helpers for recording the real site: a visible cursor, human-like mouse movement,
// smooth scrolling, and a CDP screencast recorder that turns frames into an MP4 clip.
import { spawnSync } from "node:child_process";
import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";

export const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// Headless Chrome draws no cursor, so the page draws its own (and a soft ring on press).
export const CURSOR_SCRIPT = `
(() => {
  if (window.__cursorInstalled) return;
  window.__cursorInstalled = true;
  let cursor, ring;
  const ensure = () => {
    if (cursor && cursor.isConnected) return;
    cursor = document.createElement('div');
    cursor.style.cssText = 'position:fixed;left:0;top:0;width:28px;height:28px;z-index:2147483647;pointer-events:none;transform:translate(-100px,-100px)';
    cursor.innerHTML = '<svg width="28" height="28" viewBox="0 0 28 28"><path d="M5 3l16 9-7 2-3 7z" fill="#000" stroke="#fff" stroke-width="1.6" stroke-linejoin="round"/></svg>';
    ring = document.createElement('div');
    ring.style.cssText = 'position:fixed;left:0;top:0;width:46px;height:46px;margin:-23px 0 0 -23px;border-radius:50%;border:2px solid rgba(0,0,0,.5);background:rgba(0,0,0,.1);z-index:2147483646;pointer-events:none;opacity:0;transform:translate(-100px,-100px) scale(.4)';
    document.documentElement.append(ring, cursor);
  };
  addEventListener('mousemove', (e) => { ensure(); cursor.style.opacity = 1; cursor.style.transform = 'translate(' + (e.clientX - 5) + 'px,' + (e.clientY - 3) + 'px)'; }, true);
  addEventListener('pointerdown', (e) => {
    ensure();
    if (e.pointerType === 'touch') cursor.style.opacity = 0;
    ring.style.transition = 'none';
    ring.style.transform = 'translate(' + e.clientX + 'px,' + e.clientY + 'px) scale(.4)';
    ring.style.opacity = 1;
    requestAnimationFrame(() => requestAnimationFrame(() => {
      ring.style.transition = 'transform .38s ease-out, opacity .5s ease-out';
      ring.style.transform = 'translate(' + e.clientX + 'px,' + e.clientY + 'px) scale(1.15)';
      ring.style.opacity = 0;
    }));
  }, true);
})();
`;

const easeInOut = (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

/** Everything a scene needs, bound to one page. */
export function makeActor(page, { touch = false } = {}) {
  let pos = { x: 700, y: 420 };

  const glide = async (to, ms = 650) => {
    const from = pos;
    const dist = Math.hypot(to.x - from.x, to.y - from.y);
    const steps = Math.max(10, Math.round(ms / 16));
    const nx = -(to.y - from.y) / (dist || 1);
    const ny = (to.x - from.x) / (dist || 1);
    for (let i = 1; i <= steps; i++) {
      const t = easeInOut(i / steps);
      const arc = Math.sin(Math.PI * (i / steps)) * dist * 0.06;
      await page.mouse.move(from.x + (to.x - from.x) * t + nx * arc, from.y + (to.y - from.y) * t + ny * arc);
      await sleep(ms / steps);
    }
    pos = to;
  };

  const box = async (locator) => {
    const loc = typeof locator === "string" ? page.locator(locator).first() : locator;
    await loc.waitFor({ state: "visible", timeout: 15000 });
    const b = await loc.boundingBox();
    if (!b) throw new Error("no box for " + locator);
    return { loc, b };
  };

  return {
    page,
    pause: sleep,
    get pos() {
      return pos;
    },

    async moveTo(locator, { dx = 0.5, dy = 0.5, ms } = {}) {
      const { b } = await box(locator);
      await glide({ x: b.x + b.width * dx, y: b.y + b.height * dy }, ms ?? 450 + Math.min(700, Math.hypot(b.x - pos.x, b.y - pos.y) * 0.7));
    },

    async click(locator, opts = {}) {
      const target = typeof locator === "string" ? page.locator(locator).first() : locator;
      await target.waitFor({ state: "visible", timeout: 15000 });
      await target.scrollIntoViewIfNeeded(); // e.g. a button below the fold of a bottom sheet
      const { b } = await box(locator);
      const to = { x: b.x + b.width * (opts.dx ?? 0.5), y: b.y + b.height * (opts.dy ?? 0.5) };
      if (touch) {
        await page.touchscreen.tap(to.x, to.y);
      } else {
        await glide(to, opts.ms ?? 450 + Math.min(700, Math.hypot(to.x - pos.x, to.y - pos.y) * 0.7));
        await sleep(160);
        await page.mouse.down();
        await sleep(70);
        await page.mouse.up();
      }
      pos = to;
      await sleep(opts.after ?? 350);
    },

    async type(locator, text, { delay = 75 } = {}) {
      await this.click(locator);
      await page.keyboard.type(text, { delay });
    },

    async select(locator, value) {
      const { loc } = await box(locator);
      await this.moveTo(locator);
      await sleep(250);
      await loc.selectOption(value);
      await sleep(400);
    },

    async scrollTo(y, ms = 1200) {
      await page.evaluate(
        ({ y, ms }) =>
          new Promise((res) => {
            const s = scrollY;
            const t0 = performance.now();
            const f = () => {
              const p = Math.min(1, (performance.now() - t0) / ms);
              const e = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
              scrollTo(0, s + (y - s) * e);
              p < 1 ? requestAnimationFrame(f) : res();
            };
            f();
          }),
        { y, ms },
      );
    },

    async scrollToElement(locator, { offset = 120, ms = 1200 } = {}) {
      const { loc } = await box(locator);
      const y = await loc.evaluate((el, off) => el.getBoundingClientRect().top + scrollY - off, offset);
      await this.scrollTo(y, ms);
    },

    /** Wait until the page's images have loaded (product photos come from a CDN). */
    async imagesLoaded(timeout = 15000) {
      await page
        .waitForFunction(() => [...document.images].every((i) => i.complete && i.naturalWidth > 0), null, { timeout })
        .catch(() => {});
      await sleep(300);
    },
  };
}

/** Records a page with the CDP screencast; frames -> constant-30fps H.264 clip. */
export async function createRecorder(page, { tmpRoot, outDir }) {
  const cdp = await page.context().newCDPSession(page);
  let frames = [];
  let marks = [];
  let dir = "";
  let scene = "";
  let active = false;

  cdp.on("Page.screencastFrame", async (ev) => {
    if (active) frames.push({ ts: ev.metadata.timestamp * 1000, data: ev.data });
    try {
      await cdp.send("Page.screencastFrameAck", { sessionId: ev.sessionId });
    } catch {
      /* page closed */
    }
  });

  return {
    async start(name) {
      scene = name;
      frames = [];
      marks = [];
      dir = path.join(tmpRoot, name);
      rmSync(dir, { recursive: true, force: true });
      mkdirSync(dir, { recursive: true });
      active = true;
      await cdp.send("Page.startScreencast", { format: "jpeg", quality: 90, everyNthFrame: 1 });
      // make sure the first frame exists before the scene begins acting
      await page.evaluate(() => 0);
      await sleep(250);
    },

    /** Remember where something was on screen at this moment (for zooms in the edit). */
    async mark(name, locator) {
      const loc = typeof locator === "string" ? page.locator(locator).first() : locator;
      const b = await loc.boundingBox();
      marks.push({ name, at: Date.now(), rect: b ? { x: b.x, y: b.y, w: b.width, h: b.height } : null });
    },

    async stop(viewport) {
      await sleep(400);
      active = false;
      await cdp.send("Page.stopScreencast");
      if (frames.length < 2) throw new Error(`${scene}: only ${frames.length} frames captured`);
      const first = frames[0].ts;
      const lines = [];
      frames.forEach((f, i) => {
        const file = `f${String(i).padStart(5, "0")}.jpg`;
        writeFileSync(path.join(dir, file), Buffer.from(f.data, "base64"));
        const next = frames[i + 1]?.ts ?? f.ts + 600;
        lines.push(`file '${file}'`, `duration ${Math.max(0.001, (next - f.ts) / 1000).toFixed(4)}`);
      });
      lines.push(`file 'f${String(frames.length - 1).padStart(5, "0")}.jpg'`); // concat quirk: repeat last
      writeFileSync(path.join(dir, "list.txt"), lines.join("\n"));

      const out = path.join(outDir, `${scene}.mp4`);
      mkdirSync(outDir, { recursive: true });
      const r = spawnSync(
        "ffmpeg",
        ["-y", "-loglevel", "error", "-f", "concat", "-safe", "0", "-i", path.join(dir, "list.txt"),
          "-vf", "fps=30,scale=trunc(iw/2)*2:trunc(ih/2)*2", "-c:v", "libx264", "-preset", "medium", "-crf", "18",
          "-pix_fmt", "yuv420p", "-movflags", "+faststart", out],
        { encoding: "utf8" },
      );
      if (r.status !== 0) throw new Error(`ffmpeg failed for ${scene}: ${r.stderr}`);

      const probe = spawnSync("ffprobe", ["-v", "error", "-select_streams", "v:0", "-show_entries", "stream=width,height:format=duration", "-of", "json", out], { encoding: "utf8" });
      const info = JSON.parse(probe.stdout);
      rmSync(dir, { recursive: true, force: true });
      return {
        file: `clips/${scene}.mp4`,
        duration: Number(info.format.duration),
        width: info.streams[0].width,
        height: info.streams[0].height,
        viewport,
        frames: frames.length,
        marks: marks.map((m) => ({ name: m.name, t: Math.max(0, (m.at - first) / 1000), rect: m.rect })),
      };
    },
  };
}
