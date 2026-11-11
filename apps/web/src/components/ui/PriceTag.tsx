import { discountPercent, formatPrice } from "../../lib/format";

interface PriceTagProps {
  price: number;
  oldPrice?: number | null;
  size?: "md" | "lg";
}

const PriceTag = ({ price, oldPrice, size = "md" }: PriceTagProps) => {
  const percent = discountPercent(price, oldPrice);
  const text = size === "lg" ? "text-2xl lg:text-[32px]" : "text-base lg:text-2xl";
  const badge =
    size === "lg"
      ? "px-3 py-1 text-xs lg:px-3.5 lg:py-1.5 lg:text-base"
      : "px-2 py-0.5 text-[10px] lg:px-3 lg:py-1 lg:text-sm";

  return (
    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 lg:gap-x-2.5">
      <span className={`font-body-bold ${text}`}>{formatPrice(price)}</span>
      {percent > 0 && oldPrice && (
        <>
          <span className={`font-body-bold text-black/40 line-through ${text}`}>{formatPrice(oldPrice)}</span>
          <span className={`rounded-full bg-sale-bg font-body-medium text-sale ${badge}`}>
            -{percent}%
          </span>
        </>
      )}
    </div>
  );
};

export default PriceTag;
