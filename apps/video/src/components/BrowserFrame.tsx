import type { ReactNode } from "react";
import { WINDOW, CONTENT, fonts } from "../theme";

/** A browser window around real footage. Content is exactly 16:9 (the recording's shape). */
export const BrowserFrame = ({ url, children }: { url: string; children: ReactNode }) => (
  <div
    style={{
      position: "absolute",
      left: WINDOW.x,
      top: WINDOW.y,
      width: WINDOW.w,
      height: WINDOW.titleH + CONTENT.h,
      borderRadius: 18,
      overflow: "hidden",
      background: "#fff",
      boxShadow: "0 40px 90px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.08)",
    }}
  >
    <div style={{ height: WINDOW.titleH, background: "#e9e8ea", display: "flex", alignItems: "center", padding: "0 16px", gap: 8 }}>
      {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
        <span key={c} style={{ width: 12, height: 12, borderRadius: 6, background: c }} />
      ))}
      <div
        style={{
          margin: "0 auto",
          transform: "translateX(-28px)",
          width: 520,
          height: 26,
          borderRadius: 13,
          background: "#f7f6f7",
          fontFamily: fonts.body,
          fontSize: 14,
          color: "#555",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {url}
      </div>
    </div>
    <div style={{ position: "relative", width: CONTENT.w, height: CONTENT.h, overflow: "hidden" }}>{children}</div>
  </div>
);
