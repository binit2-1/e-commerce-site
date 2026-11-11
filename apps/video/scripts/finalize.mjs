// Remotion's JPEG frame pipeline writes full-range "yuvj420p"; some players show it with shifted colours.
// Re-encode to standard limited-range yuv420p (BT.709) with the moov atom up front for streaming.
import { renameSync } from "node:fs";
import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const file = path.resolve(here, "../../../docs/walkthrough/shop-walkthrough.mp4");
const tmp = file.replace(/\.mp4$/, ".tmp.mp4");

const r = spawnSync("ffmpeg", ["-y", "-loglevel", "error", "-i", file,
  "-vf", "scale=in_range=full:out_range=tv:flags=accurate_rnd+full_chroma_int,format=yuv420p",
  "-c:v", "libx264", "-preset", "slow", "-crf", "20", "-profile:v", "high", "-movflags", "+faststart",
  "-color_range", "tv", "-colorspace", "bt709", "-color_primaries", "bt709", "-color_trc", "bt709", "-an", tmp], { stdio: "inherit" });
if (r.status !== 0) process.exit(r.status ?? 1);
renameSync(tmp, file);
console.log("finalized", file);
