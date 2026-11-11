import { Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import type { ReactNode } from "react";
import type { ClipInfo, Zoom as ZoomDef } from "../storyboard";

const inOut = Easing.inOut(Easing.cubic);

/**
 * Punches in on a real element (its on-screen rect was measured while recording).
 * Zooms are few and caused by something happening there: the click, the total, the new review.
 */
export const Zoom = ({ clip, zooms, rate, trimStart, children }: { clip: ClipInfo; zooms: ZoomDef[]; rate: number; trimStart: number; children: ReactNode }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps; // scene seconds

  let scale = 1;
  let ox = 50;
  let oy = 50;
  for (const z of zooms) {
    const mark = clip.marks.find((m) => m.name === z.mark);
    if (!mark?.rect) continue;
    const tm = (mark.t - trimStart) / rate; // when the action happens, in scene seconds
    const a = tm - 0.7;
    const b = tm - 0.1;
    const c = tm + z.hold;
    const d = c + 0.8;
    const s = interpolate(t, [a, b, c, d], [1, z.scale, z.scale, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: inOut });
    if (s > scale) {
      scale = s;
      ox = ((mark.rect.x + mark.rect.w / 2) / clip.viewport.width) * 100;
      oy = ((mark.rect.y + mark.rect.h / 2) / clip.viewport.height) * 100;
    }
  }
  // keep the focus point off the very edge so the zoom never reveals nothing
  ox = Math.min(88, Math.max(12, ox));
  oy = Math.min(88, Math.max(12, oy));

  return <div style={{ width: "100%", height: "100%", transformOrigin: `${ox}% ${oy}%`, transform: `scale(${scale})` }}>{children}</div>;
};
