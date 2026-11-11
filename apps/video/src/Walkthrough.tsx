import { Fragment } from "react";
import { linearTiming, TransitionSeries } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import "./fonts";
import { Intro } from "./scenes/Intro";
import { ClipScene } from "./scenes/ClipScene";
import { Outro } from "./scenes/Outro";
import { PhoneScene } from "./scenes/PhoneScene";
import { INTRO_FRAMES, OUTRO_FRAMES, TRANSITION_FRAMES, sceneFrames, scenes } from "./storyboard";

const seam = (key: string) => (
  <TransitionSeries.Transition key={key} presentation={fade()} timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })} />
);

export const Walkthrough = () => (
  <TransitionSeries>
    <TransitionSeries.Sequence durationInFrames={INTRO_FRAMES}>
      <Intro />
    </TransitionSeries.Sequence>
    {scenes.map((def, i) => (
      <Fragment key={def.id}>
        {seam(`t-${def.id}`)}
        <TransitionSeries.Sequence durationInFrames={sceneFrames(def)}>
          {def.kind === "phone" ? <PhoneScene def={def} step={i + 1} /> : <ClipScene def={def} step={i + 1} />}
        </TransitionSeries.Sequence>
      </Fragment>
    ))}
    {seam("t-outro")}
    <TransitionSeries.Sequence durationInFrames={OUTRO_FRAMES}>
      <Outro />
    </TransitionSeries.Sequence>
  </TransitionSeries>
);
