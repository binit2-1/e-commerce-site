import { AbsoluteFill, OffthreadVideo, staticFile } from "remotion";
import { Background } from "../components/Background";
import { Words } from "../components/Caption";
import { clipOf, scenes, type SceneDef } from "../storyboard";
import { FPS, colors, fonts, HEIGHT } from "../theme";

/** The phone-width recording in a device frame, with the caption set large beside it. */
export const PhoneScene = ({ def, step }: { def: SceneDef; step: number }) => {
  const clip = clipOf(def.id);
  const screenH = 860;
  const screenW = Math.round((screenH * clip.width) / clip.height);
  const bezel = 14;
  return (
    <AbsoluteFill>
      <Background />
      <div style={{ position: "absolute", left: 200, top: 0, bottom: 0, display: "flex", flexDirection: "column", justifyContent: "center", gap: 26 }}>
        <div style={{ fontFamily: fonts.body, fontSize: 28, fontWeight: 500, letterSpacing: "0.18em", color: colors.muted }}>
          {String(step).padStart(2, "0")} / {scenes.length} · PHONE
        </div>
        <Words text="Made for" start={4} size={104} weight={700} color={colors.white} />
        <Words text="phones too" start={10} size={104} weight={700} color={colors.white} />
        <Words text={def.sub} start={22} size={36} weight={400} color={colors.muted} />
      </div>

      <div
        style={{
          position: "absolute",
          left: 1230,
          top: (HEIGHT - screenH - bezel * 2) / 2,
          width: screenW + bezel * 2,
          height: screenH + bezel * 2,
          borderRadius: 64,
          background: "#101013",
          padding: bezel,
          boxShadow: "0 40px 90px rgba(0,0,0,0.6), 0 0 0 2px #2a2a31",
        }}
      >
        <div style={{ width: screenW, height: screenH, borderRadius: 50, overflow: "hidden", background: "#fff" }}>
          <OffthreadVideo src={staticFile(clip.file)} playbackRate={def.rate} muted style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 0, fontSize: FPS }} />
    </AbsoluteFill>
  );
};
