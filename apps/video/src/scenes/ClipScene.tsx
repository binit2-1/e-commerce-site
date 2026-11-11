import { AbsoluteFill, OffthreadVideo, staticFile } from "remotion";
import { Background } from "../components/Background";
import { BrowserFrame } from "../components/BrowserFrame";
import { Caption } from "../components/Caption";
import { Zoom } from "../components/Zoom";
import { clipOf, scenes, type SceneDef } from "../storyboard";
import { FPS } from "../theme";

/** A desktop recording of the real site in a browser window, with its caption. */
export const ClipScene = ({ def, step }: { def: SceneDef; step: number }) => {
  const clip = clipOf(def.id);
  const start = def.trimStart ?? 0;
  return (
    <AbsoluteFill>
      <Background />
      <BrowserFrame url={def.url}>
        <Zoom clip={clip} zooms={def.zooms ?? []} rate={def.rate} trimStart={start}>
          <OffthreadVideo
            src={staticFile(clip.file)}
            playbackRate={def.rate}
            trimBefore={Math.round(start * FPS)}
            muted
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </Zoom>
      </BrowserFrame>
      <Caption step={step} total={scenes.length} title={def.title} sub={def.sub} />
    </AbsoluteFill>
  );
};
