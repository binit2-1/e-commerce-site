const STAR_PATH =
  "M10 1.5l2.6 5.6 6.1.7-4.5 4.2 1.2 6L10 15l-5.4 3 1.2-6L1.3 7.8l6.1-.7L10 1.5Z";

const Star = ({ fill, size }: { fill: number; size: number }) => (
  <span className="relative inline-block" style={{ width: size, height: size }}>
    <svg viewBox="0 0 20 20" width={size} height={size} className="absolute inset-0 text-black/10" aria-hidden>
      <path d={STAR_PATH} fill="currentColor" />
    </svg>
    <span className="absolute inset-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
      <svg viewBox="0 0 20 20" width={size} height={size} className="text-star" aria-hidden>
        <path d={STAR_PATH} fill="currentColor" />
      </svg>
    </span>
  </span>
);

interface StarRatingProps {
  rating: number;
  size?: number;
  /** Show the "4.5/5" label after the stars. */
  showValue?: boolean;
}

const StarRating = ({ rating, size = 18, showValue = true }: StarRatingProps) => (
  <div className="flex items-center gap-2" role="img" aria-label={`Rated ${rating} out of 5`}>
    <div className="flex gap-0.5">
      {[0, 1, 2, 3, 4].map((i) => (
        <Star key={i} size={size} fill={Math.min(1, Math.max(0, rating - i))} />
      ))}
    </div>
    {showValue && (
      <span className="text-sm">
        {rating}
        <span className="text-muted">/5</span>
      </span>
    )}
  </div>
);

export default StarRating;
