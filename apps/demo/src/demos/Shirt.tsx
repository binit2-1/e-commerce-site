import { useId } from "react";

/** A plaid shirt drawn in SVG, so the demos need no photos. */
export function Shirt({ base = "#c8191f", line = "#14141a", size = 160 }: { base?: string; line?: string; size?: number }) {
  const id = "plaid" + useId().replace(/[^a-zA-Z0-9]/g, "");
  return (
    <svg viewBox="0 0 200 200" width={size} height={size} aria-hidden>
      <defs>
        <pattern id={id} width="22" height="22" patternUnits="userSpaceOnUse">
          <rect width="22" height="22" fill={base} />
          <rect width="11" height="22" fill={line} opacity="0.55" />
          <rect width="22" height="11" fill={line} opacity="0.55" />
        </pattern>
      </defs>
      <path
        d="M70 22 L100 34 L130 22 L176 46 L162 88 L140 78 L140 176 L60 176 L60 78 L38 88 L24 46 Z"
        fill={`url(#${id})`}
        stroke="rgba(0,0,0,0.18)"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M70 22 L100 46 L130 22 L100 34 Z" fill="rgba(255,255,255,0.35)" />
      <path d="M100 46 V176" stroke="rgba(0,0,0,0.3)" strokeWidth="1.5" />
    </svg>
  );
}

export function CartIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M2 3h3l2.6 11.2a1.5 1.5 0 0 0 1.5 1.2h8a1.5 1.5 0 0 0 1.5-1.1L20.5 7H6" />
      <circle cx="9.5" cy="19.5" r="1.4" />
      <circle cx="17" cy="19.5" r="1.4" />
    </svg>
  );
}
