import { formatPrice } from "../../../lib/format";
import { PRICE_MAX, PRICE_MIN } from "../params";

interface PriceRangeProps {
  min: number;
  max: number;
  onChange: (range: { min: number; max: number }) => void;
}

const STEP = 5;
const GAP = 10;

const PriceRange = ({ min, max, onChange }: PriceRangeProps) => {
  const span = PRICE_MAX - PRICE_MIN;
  const left = ((min - PRICE_MIN) / span) * 100;
  const right = ((max - PRICE_MIN) / span) * 100;

  return (
    <div>
      <div className="relative mx-2.5 h-5">
        <div className="absolute left-0 right-0 top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-surface" />
        <div
          className="absolute top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-black"
          style={{ left: `${left}%`, right: `${100 - right}%` }}
        />
        <input
          type="range"
          aria-label="Minimum price"
          className="range-input"
          min={PRICE_MIN}
          max={PRICE_MAX}
          step={STEP}
          value={min}
          onChange={(e) => onChange({ min: Math.min(Number(e.target.value), max - GAP), max })}
        />
        <input
          type="range"
          aria-label="Maximum price"
          className="range-input"
          min={PRICE_MIN}
          max={PRICE_MAX}
          step={STEP}
          value={max}
          onChange={(e) => onChange({ min, max: Math.max(Number(e.target.value), min + GAP) })}
        />
      </div>
      <div className="mt-3 flex justify-between text-sm">
        <span>{formatPrice(min)}</span>
        <span>{formatPrice(max)}</span>
      </div>
    </div>
  );
};

export default PriceRange;
