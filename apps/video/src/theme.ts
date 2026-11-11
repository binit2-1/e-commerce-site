export const FPS = 30;
export const WIDTH = 1920;
export const HEIGHT = 1080;

export const colors = {
  ground: "#0c0c10",
  groundSoft: "#16161c",
  ink: "#0b0b0f",
  paper: "#f2f0f1",
  white: "#ffffff",
  muted: "rgba(255,255,255,0.66)",
  line: "rgba(255,255,255,0.14)",
  sale: "#ff4d4d",
  ok: "#1fc45a",
};

export const fonts = {
  display: "PP Neue Montreal, Satoshi, sans-serif",
  body: "Satoshi, system-ui, sans-serif",
};

// The browser window: 16:9 content so the 1440x810 recordings fit without cropping.
export const WINDOW = { x: 200, y: 34, w: 1520, titleH: 40 };
export const CONTENT = { w: WINDOW.w, h: Math.round((WINDOW.w * 9) / 16) }; // 1520 x 855
