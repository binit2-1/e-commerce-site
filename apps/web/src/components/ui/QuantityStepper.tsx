import { Minus, Plus } from "../icons";

interface QuantityStepperProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  className?: string;
}

const QuantityStepper = ({ value, onChange, min = 1, max = 99, className = "" }: QuantityStepperProps) => (
  <div className={`inline-flex items-center justify-between gap-5 rounded-full bg-surface px-4 py-3 ${className}`}>
    <button
      type="button"
      aria-label="Decrease quantity"
      disabled={value <= min}
      onClick={() => onChange(value - 1)}
      className="disabled:opacity-30"
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
      className="disabled:opacity-30"
    >
      <Plus width={20} height={20} />
    </button>
  </div>
);

export default QuantityStepper;
