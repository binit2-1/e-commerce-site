import { Minus, Plus } from "../icons";

interface QuantityStepperProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  /** Tighter padding on small screens (used inside list rows). */
  compact?: boolean;
  className?: string;
}

const QuantityStepper = ({ value, onChange, min = 1, max = 99, compact = false, className = "" }: QuantityStepperProps) => (
  <div
    className={`inline-flex items-center justify-between rounded-full bg-surface ${
      compact ? "gap-3 px-3 py-1.5 lg:gap-5 lg:px-4 lg:py-3" : "gap-5 px-4 py-3"
    } ${className}`}
  >
    <button
      type="button"
      aria-label="Decrease quantity"
      disabled={value <= min}
      onClick={() => onChange(value - 1)}
      className="disabled:opacity-40"
    >
      <Minus width={20} height={20} />
    </button>
    <span className="min-w-4 text-center text-sm" aria-live="polite">
      {value}
    </span>
    <button
      type="button"
      aria-label="Increase quantity"
      disabled={value >= max}
      onClick={() => onChange(value + 1)}
      className="disabled:opacity-40"
    >
      <Plus width={20} height={20} />
    </button>
  </div>
);

export default QuantityStepper;
