import { PRODUCT_COLORS, PRODUCT_SIZES, PRODUCT_STYLES, PRODUCT_TYPES, type ProductQuery } from "@shop/shared";
import { useState } from "react";
import { ChevronRight, Sliders } from "../../../components/icons";
import Button from "../../../components/ui/Button";
import Chip from "../../../components/ui/Chip";
import ColorSwatch from "../../../components/ui/ColorSwatch";
import { PRICE_MAX, PRICE_MIN } from "../params";
import FilterSection from "./FilterSection";
import PriceRange from "./PriceRange";

type Filters = Pick<ProductQuery, "type" | "style" | "minPrice" | "maxPrice" | "colors" | "sizes">;

interface FilterPanelProps {
  value: Filters;
  onApply: (filters: Filters) => void;
  onClear: () => void;
}

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
const toggle = (list: string[], item: string) => (list.includes(item) ? list.filter((x) => x !== item) : [...list, item]);

function OptionRow({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={`flex w-full items-center justify-between py-2.5 text-left ${selected ? "font-body-bold text-black" : "text-black/60 hover:text-black"}`}
    >
      {label}
      <ChevronRight width={18} height={18} />
    </button>
  );
}

/** Draft filters live here; they only reach the URL when "Apply Filter" is pressed. */
const FilterPanel = ({ value, onApply, onClear }: FilterPanelProps) => {
  const [draft, setDraft] = useState<Filters>(value);
  const min = draft.minPrice ?? PRICE_MIN;
  const max = draft.maxPrice ?? PRICE_MAX;

  const apply = () =>
    onApply({
      ...draft,
      minPrice: min > PRICE_MIN ? min : undefined,
      maxPrice: max < PRICE_MAX ? max : undefined,
    });

  return (
    <div className="rounded-[20px] border border-line px-5 py-5 lg:px-6">
      <div className="flex items-center justify-between pb-5">
        <h2 className="font-body-bold text-xl">Filters</h2>
        <Sliders width={20} height={20} className="text-black/40" />
      </div>

      <div className="border-t border-line py-3">
        {PRODUCT_TYPES.map((t) => (
          <OptionRow
            key={t}
            label={cap(t)}
            selected={draft.type === t}
            onClick={() => setDraft((d) => ({ ...d, type: d.type === t ? undefined : t }))}
          />
        ))}
      </div>

      <FilterSection title="Price">
        <PriceRange min={min} max={max} onChange={(r) => setDraft((d) => ({ ...d, minPrice: r.min, maxPrice: r.max }))} />
      </FilterSection>

      <FilterSection title="Colors">
        <div className="flex flex-wrap gap-4">
          {PRODUCT_COLORS.map((c) => (
            <ColorSwatch
              key={c.name}
              name={c.name}
              hex={c.hex}
              selected={draft.colors.includes(c.name)}
              onClick={() => setDraft((d) => ({ ...d, colors: toggle(d.colors, c.name) }))}
            />
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Size">
        <div className="flex flex-wrap gap-2">
          {PRODUCT_SIZES.map((s) => (
            <Chip
              key={s}
              selected={draft.sizes.includes(s)}
              onClick={() => setDraft((d) => ({ ...d, sizes: toggle(d.sizes, s) }))}
            >
              {s}
            </Chip>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Dress Style">
        {PRODUCT_STYLES.map((s) => (
          <OptionRow
            key={s}
            label={cap(s)}
            selected={draft.style === s}
            onClick={() => setDraft((d) => ({ ...d, style: d.style === s ? undefined : s }))}
          />
        ))}
      </FilterSection>

      <Button full onClick={apply} className="mt-2">
        Apply Filter
      </Button>
      <button type="button" onClick={onClear} className="mt-3 w-full text-center text-sm text-muted underline">
        Clear all
      </button>
    </div>
  );
};

export default FilterPanel;
