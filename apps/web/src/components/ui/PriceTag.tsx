import { discountPercent, formatPrice } from "../../lib/format";

interface PriceTagProps {
  price: number;
  oldPrice?: number | null;
  size?: "md" | "lg";
}

const PriceTag = ({ price, oldPrice, size = "md" }: PriceTagProps) => {
  const percent = discountPercent(price, oldPrice);
  const text = size === "lg" ? "text-3xl" : "text-xl lg:text-2xl";

  return (
    <div className="flex flex-wrap items-center gap-2.5">
      <span className={`font-body-bold ${text}`}>{formatPrice(price)}</span>
      {percent > 0 && oldPrice && (
        <>
          <span className={`font-body-bold text-black/40 line-through ${text}`}>{formatPrice(oldPrice)}</span>
          <span className="rounded-full bg-sale-bg px-3 py-1 text-xs font-body-medium text-sale lg:text-sm">
            -{percent}%
          </span>
        </>
      )}
    </div>
  );
};

export default PriceTag;
