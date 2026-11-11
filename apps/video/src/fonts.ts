import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";

// The site's own fonts, so captions match the product. loadFont delays rendering until ready.
loadFont({ family: "Satoshi", url: staticFile("fonts/Satoshi-Regular.ttf"), weight: "400" });
loadFont({ family: "Satoshi", url: staticFile("fonts/Satoshi-Medium.ttf"), weight: "500" });
loadFont({ family: "Satoshi", url: staticFile("fonts/Satoshi-Bold.ttf"), weight: "700" });
loadFont({ family: "PP Neue Montreal", url: staticFile("fonts/PPNeueMontreal-Bold.otf"), weight: "700" });
