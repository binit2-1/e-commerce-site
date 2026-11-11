import type { ButtonHTMLAttributes } from "react";

interface ChipProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean;
  /** "sm" for filter lists, "lg" for the product size picker. */
  size?: "sm" | "lg";
}

/** Pill toggle used for sizes. */
const Chip = ({ selected = false, size = "sm", className = "", children, ...rest }: ChipProps) => (
  <button
    type="button"
    aria-pressed={selected}
    className={`rounded-full text-sm transition-colors ${
      size === "lg" ? "px-5 py-3 lg:px-6 lg:text-base" : "px-4 py-2.5"
    } ${selected ? "bg-black text-white" : "bg-surface text-black/60 hover:bg-black/10"} ${className}`}
    {...rest}
  >
    {children}
  </button>
);

export default Chip;
