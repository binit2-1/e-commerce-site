import { Composition } from "remotion";
import { Walkthrough } from "./Walkthrough";
import { totalFrames } from "./storyboard";
import { FPS, HEIGHT, WIDTH } from "./theme";

export const RemotionRoot = () => (
  <Composition id="Walkthrough" component={Walkthrough} durationInFrames={totalFrames()} fps={FPS} width={WIDTH} height={HEIGHT} />
);
