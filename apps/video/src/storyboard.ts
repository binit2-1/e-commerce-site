import manifestJson from "../public/clips/manifest.json";
import { FPS } from "./theme";

export interface Mark {
  name: string;
  t: number;
  rect: { x: number; y: number; w: number; h: number } | null;
}
export interface ClipInfo {
  file: string;
  duration: number;
  width: number;
  height: number;
  viewport: { width: number; height: number };
  marks: Mark[];
}
const manifest = manifestJson as unknown as Record<string, ClipInfo>;

export interface Zoom {
  mark: string;
  scale: number;
  /** seconds (of the edited scene) to stay zoomed after the action */
  hold: number;
}

export interface SceneDef {
  id: string;
  kind: "browser" | "phone";
  url: string;
  title: string;
  sub: string;
  /** playback speed of the recording */
  rate: number;
  /** seconds of the recording to skip at the start / drop at the end */
  trimStart?: number;
  trimEnd?: number;
  zooms?: Zoom[];
}

// The order of the film. Pacing follows the HyperFrames "contrast speeds" rule:
// typing and scrolling run faster, moments the viewer must read keep their speed.
export const scenes: SceneDef[] = [
  { id: "home", kind: "browser", url: "shop.co", title: "Browse the store", sub: "Hero, new arrivals, top sellers and dress styles", rate: 1.2 },
  { id: "search", kind: "browser", url: "shop.co/shop", title: "Search, filter and sort", sub: "Every filter lives in the URL, so a page can be shared", rate: 1.4 },
  { id: "mobile", kind: "phone", url: "shop.co", title: "Made for phones too", sub: "A slide-out menu and a bottom-sheet filter", rate: 1.0 },
  { id: "product", kind: "browser", url: "shop.co/products", title: "Pick a size and a color", sub: "Gallery, quantity and add to cart", rate: 1.3, zooms: [{ mark: "addToCart", scale: 1.35, hold: 2.2 }] },
  { id: "cart", kind: "browser", url: "shop.co/cart", title: "Cart and promo codes", sub: "A wrong code is rejected, SHOP20 takes 20% off", rate: 1.25, zooms: [{ mark: "totals", scale: 1.3, hold: 2.4 }] },
  { id: "signup", kind: "browser", url: "shop.co/register", title: "Sign up at checkout", sub: "Your cart comes with you", rate: 1.35 },
  { id: "checkout", kind: "browser", url: "shop.co/checkout", title: "Place your order", sub: "No payment taken: the order is simply recorded", rate: 1.0, zooms: [{ mark: "placed", scale: 1.3, hold: 2.4 }] },
  { id: "orders", kind: "browser", url: "shop.co/orders", title: "Orders and reviews", sub: "History, details and a posted review", rate: 1.5, zooms: [{ mark: "review", scale: 1.3, hold: 2.0 }] },
  { id: "session", kind: "browser", url: "shop.co", title: "Your cart is saved", sub: "Log out, log back in, and it is still there", rate: 1.3, zooms: [{ mark: "badge", scale: 1.7, hold: 0.8 }] },
];

export const INTRO_FRAMES = 6 * FPS;
export const OUTRO_FRAMES = 6 * FPS;
export const TRANSITION_FRAMES = 10;

export function clipOf(id: string): ClipInfo {
  const c = manifest[id];
  if (!c) throw new Error(`No recording for scene "${id}" (run npm run capture -w @shop/video)`);
  return c;
}

export function sceneFrames(s: SceneDef): number {
  const c = clipOf(s.id);
  const seconds = (c.duration - (s.trimStart ?? 0) - (s.trimEnd ?? 0)) / s.rate;
  return Math.round(seconds * FPS);
}

export function totalFrames(): number {
  const sum = INTRO_FRAMES + OUTRO_FRAMES + scenes.reduce((n, s) => n + sceneFrames(s), 0);
  const seams = scenes.length + 1; // intro->first ... last->outro
  return sum - seams * TRANSITION_FRAMES;
}
