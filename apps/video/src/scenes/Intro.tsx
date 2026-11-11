import { AbsoluteFill, Easing, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { Words } from "../components/Caption";
import { colors, fonts } from "../theme";

const settle = Easing.bezier(0.16, 1, 0.3, 1);
const CHIPS = ["Browse", "Filter", "Cart", "Sign up", "Checkout", "Orders", "Reviews"];

/** Title card on the site's own hero image, brand font and colors. */
export const Intro = () => {
  const frame = useCurrentFrame();
  const bgScale = interpolate(frame, [0, 180], [1.07, 1], { easing: Easing.out(Easing.cubic), extrapolateRight: "clamp" });
  const exit = interpolate(frame, [168, 178], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ background: colors.paper }}>
      <AbsoluteFill style={{ transform: `scale(${bgScale})`, transformOrigin: "75% 50%" }}>
        <Img src={staticFile("img/landingImage.png")} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "82% center" }} />
      </AbsoluteFill>

      <div style={{ position: "absolute", left: 140, top: 0, bottom: 0, width: 1000, display: "flex", flexDirection: "column", justifyContent: "center", gap: 34, opacity: exit }}>
        <div style={{ fontFamily: fonts.body, fontSize: 28, fontWeight: 500, letterSpacing: "0.2em", color: "rgba(0,0,0,0.55)" }}>
          <Words text="FULL WALKTHROUGH" start={2} size={28} weight={500} color="rgba(0,0,0,0.55)" />
        </div>

        <div style={{ fontFamily: fonts.display, fontSize: 196, lineHeight: 0.9, color: colors.ink, letterSpacing: "-0.02em", display: "flex" }}>
          {"SHOP.CO".split("").map((ch, i) => {
            const t = interpolate(frame, [8 + i * 3, 8 + i * 3 + 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: settle });
            return (
              <span key={i} style={{ display: "inline-block", opacity: 0.3 + 0.7 * t, filter: `blur(${(1 - t) * 8}px)` }}>
                {ch}
              </span>
            );
          })}
        </div>

        <Words text="A full-stack store, shown end to end" start={40} size={50} weight={500} color={colors.ink} />

        <div style={{ display: "flex", flexWrap: "wrap", gap: 14, maxWidth: 700 }}>
          {CHIPS.map((c, i) => {
            const t = interpolate(frame, [72 + i * 5, 72 + i * 5 + 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: settle });
            return (
              <span
                key={c}
                style={{
                  fontFamily: fonts.body,
                  fontSize: 26,
                  fontWeight: 500,
                  color: colors.ink,
                  padding: "10px 24px",
                  borderRadius: 999,
                  background: "rgba(255,255,255,0.7)",
                  border: "1px solid rgba(0,0,0,0.1)",
                  opacity: t,
                  filter: `blur(${(1 - t) * 6}px)`,
                }}
              >
                {c}
              </span>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};
