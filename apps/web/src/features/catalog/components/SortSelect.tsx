import { PRODUCT_SORTS, type ProductQuery } from "@shop/shared";
import { ChevronDown } from "../../../components/icons";

const labels: Record<ProductQuery["sort"], string> = {
  popular: "Most Popular",
  newest: "Newest",
  price_asc: "Price: Low to High",
  price_desc: "Price: High to Low",
};

interface SortSelectProps {
  value: ProductQuery["sort"];
  onChange: (value: ProductQuery["sort"]) => void;
}

const SortSelect = ({ value, onChange }: SortSelectProps) => (
  <label className="flex items-center gap-1 text-sm lg:text-base">
    <span className="hidden text-muted sm:inline">Sort by:</span>
    <span className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as ProductQuery["sort"])}
        className="cursor-pointer appearance-none bg-transparent py-1 pr-6 font-body-medium outline-none"
      >
        {PRODUCT_SORTS.map((s) => (
          <option key={s} value={s}>
            {labels[s]}
          </option>
        ))}
      </select>
      <ChevronDown width={16} height={16} className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2" />
    </span>
  </label>
);

export default SortSelect;
