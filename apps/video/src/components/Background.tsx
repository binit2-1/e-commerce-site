import { AbsoluteFill } from "remotion";
import { colors } from "../theme";

/** The dark ground every walkthrough scene sits on. */
export const Background = () => (
  <AbsoluteFill
    style={{
      background: `radial-gradient(1200px 700px at 50% 38%, ${colors.groundSoft} 0%, ${colors.ground} 70%)`,
    }}
  />
);
