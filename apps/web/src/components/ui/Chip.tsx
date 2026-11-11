import type { ButtonHTMLAttributes } from "react";

interface ChipProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean;
}

/** Pill toggle used for sizes. */
const Chip = ({ selected = false, className = "", children, ...rest }: ChipProps) => (
  <button
    type="button"
    aria-pressed={selected}
    className={`rounded-full px-5 py-2.5 text-sm transition-colors ${
      selected ? "bg-black text-white" : "bg-surface text-black/60 hover:bg-black/10"
    } ${className}`}
    {...rest}
  >
    {children}
  </button>
);

export default Chip;
