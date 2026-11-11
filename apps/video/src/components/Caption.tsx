import { Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { colors, fonts, HEIGHT, WINDOW, CONTENT } from "../theme";

const settle = Easing.bezier(0.16, 1, 0.3, 1); // long-tailed arrival

/** Words that arrive one by one: blur -> sharp, ~70 ms apart (HyperFrames title pattern). */
export const Words = ({ text, start, size, weight, color }: { text: string; start: number; size: number; weight: number; color: string }) => {
  const frame = useCurrentFrame();
  const words = text.split(" ");
  return (
    <div style={{ fontFamily: fonts.body, fontSize: size, fontWeight: weight, color, lineHeight: 1.15, whiteSpace: "nowrap" }}>
      {words.map((w, i) => {
        const t = interpolate(frame, [start + i * 2, start + i * 2 + 5], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: settle });
        return (
          <span key={i} style={{ display: "inline-block", marginRight: size * 0.28, opacity: t, filter: `blur(${(1 - t) * 6}px)` }}>
            {w}
          </span>
        );
      })}
    </div>
  );
};

/**
 * Lower-third under the browser window: step number, a title and one quiet line.
 * Lands, holds still, then leaves with a short fade (exits are shorter than entrances).
 */
export const Caption = ({ step, total, title, sub }: { step: number; total: number; title: string; sub: string }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const exit = interpolate(frame, [durationInFrames - 8, durationInFrames - 2], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const top = WINDOW.y + WINDOW.titleH + CONTENT.h + 38;

  return (
    <div style={{ position: "absolute", left: WINDOW.x, right: WINDOW.x, top, height: HEIGHT - top - 26, display: "flex", alignItems: "center", gap: 28, opacity: exit }}>
      <div
        style={{
          width: 76,
          height: 76,
          borderRadius: 38,
          border: `2px solid ${colors.line}`,
          color: colors.white,
          fontFamily: fonts.display,
          fontSize: 30,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flex: "none",
        }}
      >
        {String(step).padStart(2, "0")}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <Words text={title} start={4} size={46} weight={700} color={colors.white} />
        <Words text={sub} start={14} size={29} weight={400} color={colors.muted} />
      </div>
      <div style={{ marginLeft: "auto", fontFamily: fonts.body, fontSize: 22, color: colors.muted, flex: "none" }}>
        {step} / {total}
      </div>
    </div>
  );
};
