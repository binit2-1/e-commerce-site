import type { ProductDetail } from "@shop/shared";
import { useState } from "react";
import ReviewList from "./ReviewList";

const tabs = [
  { id: "details", label: "Product Details" },
  { id: "reviews", label: "Rating & Reviews" },
  { id: "faqs", label: "FAQs" },
] as const;
type TabId = (typeof tabs)[number]["id"];

const faqs = [
  { q: "How long does delivery take?", a: "Standard delivery takes 3-5 working days. Express options are shown at checkout." },
  { q: "Can I return an item?", a: "Yes. Unworn items with tags can be returned within 30 days for a full refund." },
  { q: "How should I care for this item?", a: "Machine wash cold with similar colors and tumble dry low. Check the garment label for details." },
  { q: "Does it fit true to size?", a: "Most customers find it true to size. If you are between sizes we suggest sizing up." },
];

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const ProductTabs = ({ product }: { product: ProductDetail }) => {
  const [active, setActive] = useState<TabId>("reviews");

  return (
    <div className="mt-12 lg:mt-16">
      <div role="tablist" aria-label="Product information" className="grid grid-cols-3 border-b border-line">
        {tabs.map((t) => (
          <button
            key={t.id}
            role="tab"
            type="button"
            id={`tab-${t.id}`}
            aria-selected={active === t.id}
            aria-controls={`panel-${t.id}`}
            onClick={() => setActive(t.id)}
            className={`-mb-px border-b-2 px-2 py-4 text-sm lg:py-5 lg:text-xl ${
              active === t.id ? "border-black text-black" : "border-transparent text-muted hover:text-black"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div role="tabpanel" id={`panel-${active}`} aria-labelledby={`tab-${active}`} className="pt-6 lg:pt-8">
        {active === "details" && (
          <div className="max-w-3xl space-y-4">
            <p className="text-black/60">{product.description}</p>
            <dl className="grid grid-cols-[120px_1fr] gap-y-2 text-sm lg:text-base">
              <dt className="text-muted">Type</dt>
              <dd>{cap(product.type)}</dd>
              <dt className="text-muted">Dress style</dt>
              <dd>{cap(product.style)}</dd>
              <dt className="text-muted">Colors</dt>
              <dd>{product.colors.map((c) => c.name).join(", ") || "-"}</dd>
              <dt className="text-muted">Sizes</dt>
              <dd>{product.sizes.join(", ") || "-"}</dd>
            </dl>
          </div>
        )}
        {active === "reviews" && <ReviewList productId={product.product_id} />}
        {active === "faqs" && (
          <div className="max-w-3xl divide-y divide-line">
            {faqs.map((f) => (
              <details key={f.q} className="py-4">
                <summary className="cursor-pointer font-body-medium">{f.q}</summary>
                <p className="mt-2 text-black/60">{f.a}</p>
              </details>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductTabs;
