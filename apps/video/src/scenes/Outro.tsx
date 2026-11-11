import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { Background } from "../components/Background";
import { Words } from "../components/Caption";
import { colors, fonts } from "../theme";

const settle = Easing.bezier(0.16, 1, 0.3, 1);
const ITEMS = [
  "Home, search and filters",
  "Product pages with reviews",
  "Cart with promo codes",
  "Sign up and log in",
  "Checkout and order history",
  "Cart saved across sessions",
  "Works on phones",
  "Real data in PostgreSQL",
];

/** Recap card: what was shown, then the stack. Holds still for the last two seconds. */
export const Outro = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Background />
      <div style={{ position: "absolute", left: 200, right: 200, top: 0, bottom: 0, display: "flex", flexDirection: "column", justifyContent: "center", gap: 56 }}>
        <div>
          <Words text="Everything you just saw" start={2} size={96} weight={700} color={colors.white} />
          <Words text="is the real site." start={10} size={96} weight={700} color={colors.white} />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "22px 80px" }}>
          {ITEMS.map((item, i) => {
            const t = interpolate(frame, [36 + i * 6, 36 + i * 6 + 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: settle });
            return (
              <div key={item} style={{ display: "flex", alignItems: "center", gap: 18, opacity: t, filter: `blur(${(1 - t) * 6}px)`, fontFamily: fonts.body, fontSize: 36, color: colors.white }}>
                <span style={{ width: 34, height: 34, borderRadius: 17, background: colors.ok, display: "flex", alignItems: "center", justifyContent: "center", flex: "none" }}>
                  <svg width="18" height="18" viewBox="0 0 16 16" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3.5 8.5l3 3 6-7" />
                  </svg>
                </span>
                {item}
              </div>
            );
          })}
        </div>

        <div style={{ fontFamily: fonts.body, fontSize: 30, color: colors.muted, letterSpacing: "0.04em", opacity: interpolate(frame, [100, 118], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}>
          React 19  ·  Express 5  ·  PostgreSQL  ·  TypeScript
        </div>
      </div>
    </AbsoluteFill>
  );
};
