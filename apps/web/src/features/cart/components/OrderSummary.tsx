import { useState, type FormEvent } from "react";
import { ArrowRight, Tag } from "../../../components/icons";
import Button from "../../../components/ui/Button";
import { formatPrice } from "../../../lib/format";
import { useCart } from "../useCart";

const Row = ({ label, value, accent }: { label: string; value: string; accent?: boolean }) => (
  <div className="flex items-center justify-between">
    <dt className={`text-base lg:text-xl ${accent ? "text-black/60" : "text-black/60"}`}>{label}</dt>
    <dd className={`font-body-bold text-base lg:text-xl ${accent ? "text-sale" : ""}`}>{value}</dd>
  </div>
);

const OrderSummary = () => {
  const { totals, state, applyPromo, clearPromo, count } = useCart();
  const [code, setCode] = useState("");
  const [promoError, setPromoError] = useState(false);
  const [checkoutNote, setCheckoutNote] = useState(false);

  const onApply = (e: FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;
    const ok = applyPromo(code);
    setPromoError(!ok);
    if (ok) setCode("");
  };

  return (
    <section aria-labelledby="order-summary" className="rounded-[20px] border border-line p-5 lg:px-6 lg:py-5">
      <h2 id="order-summary" className="font-body-bold text-xl lg:text-2xl">
        Order Summary
      </h2>

      <dl className="mt-5 space-y-5">
        <Row label="Subtotal" value={formatPrice(totals.subtotal)} />
        {totals.discount > 0 && (
          <Row label={`Discount (-${totals.discountPercent}%)`} value={`-${formatPrice(totals.discount)}`} accent />
        )}
        <Row label="Delivery Fee" value={formatPrice(totals.delivery)} />
      </dl>

      <div className="mt-5 flex items-center justify-between border-t border-line pt-5">
        <span className="text-base lg:text-xl">Total</span>
        <span className="font-body-bold text-xl lg:text-2xl">{formatPrice(totals.total)}</span>
      </div>

      <form onSubmit={onApply} className="mt-6 flex gap-3">
        <label className="relative flex-1">
          <span className="sr-only">Promo code</span>
          <Tag width={20} height={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-black/40" />
          <input
            value={code}
            onChange={(e) => {
              setCode(e.target.value);
              setPromoError(false);
            }}
            placeholder="Add promo code"
            className="w-full rounded-full bg-surface py-3 pl-12 pr-4 outline-none focus:ring-2 focus:ring-black/20"
          />
        </label>
        <Button type="submit" className="px-8 lg:px-10">
          Apply
        </Button>
      </form>
      <p className="mt-2 min-h-5 text-sm" aria-live="polite">
        {promoError && <span className="text-sale">That promo code isn&apos;t valid.</span>}
        {state.promoCode && !promoError && (
          <span className="text-muted">
            Code {state.promoCode} applied.{" "}
            <button type="button" onClick={clearPromo} className="underline">
              Remove
            </button>
          </span>
        )}
      </p>

      <Button full disabled={count === 0} onClick={() => setCheckoutNote(true)} className="mt-4 flex items-center justify-center gap-3 py-4">
        Go to Checkout <ArrowRight width={20} height={20} />
      </Button>
      <p className="mt-2 min-h-5 text-center text-sm text-muted" aria-live="polite">
        {checkoutNote && "Checkout isn't available in this demo yet."}
      </p>
    </section>
  );
};

export default OrderSummary;
