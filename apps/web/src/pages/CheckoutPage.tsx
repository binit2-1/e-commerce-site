import type { CheckoutInput, OrderSummary } from "@shop/shared";
import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { paths } from "../app/paths";
import Container from "../components/layout/Container";
import Breadcrumbs from "../components/ui/Breadcrumbs";
import Button from "../components/ui/Button";
import { useAuth } from "../features/auth/useAuth";
import { lineKey } from "../features/cart/cart";
import { useCart } from "../features/cart/useCart";
import { apiSend } from "../lib/api-client";
import { formatPrice } from "../lib/format";

const inputClass = "mt-2 w-full rounded-[20px] bg-surface px-5 py-3.5 outline-none focus:ring-2 focus:ring-black/20";

const Row = ({ label, value, accent }: { label: string; value: string; accent?: boolean }) => (
  <div className="flex justify-between">
    <dt className="text-black/60">{label}</dt>
    <dd className={`font-body-bold ${accent ? "text-sale" : ""}`}>{value}</dd>
  </div>
);

const CheckoutPage = () => {
  const { user } = useAuth();
  const { state, totals, syncNow, clear } = useCart();
  const navigate = useNavigate();

  const [shippingName, setShippingName] = useState(user?.name ?? "");
  const [shippingAddress, setShippingAddress] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [placing, setPlacing] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setPlacing(true);
    try {
      await syncNow(); // make sure the server has the cart exactly as shown here
      const body: CheckoutInput = { shippingName, shippingAddress, promoCode: state.promoCode ?? undefined };
      const order = await apiSend<Pick<OrderSummary, "order_id">>("POST", "/api/orders", body);
      clear();
      navigate(paths.order(order.order_id), { replace: true, state: { placed: true } });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not place the order");
      setPlacing(false);
    }
  };

  if (state.items.length === 0) {
    return (
      <Container className="py-20 text-center">
        <p className="font-body-bold text-xl">Your cart is empty</p>
        <Link to={paths.shop} className="mt-4 inline-block underline">
          Continue shopping
        </Link>
      </Container>
    );
  }

  return (
    <Container>
      <Breadcrumbs items={[{ label: "Home", to: paths.home }, { label: "Cart", to: paths.cart }, { label: "Checkout" }]} />
      <h1 className="font-display text-[32px] lg:text-[40px]">CHECKOUT</h1>

      <div className="mb-16 mt-6 flex flex-col gap-5 lg:mb-24 lg:grid lg:grid-cols-[1fr_505px] lg:items-start">
        <form onSubmit={onSubmit} className="rounded-[20px] border border-line p-5 lg:p-6">
          <h2 className="font-body-bold text-xl lg:text-2xl">Delivery details</h2>
          <label className="mt-5 block">
            <span className="text-sm">Full name</span>
            <input className={inputClass} value={shippingName} onChange={(e) => setShippingName(e.target.value)} autoComplete="name" required />
          </label>
          <label className="mt-5 block">
            <span className="text-sm">Address</span>
            <textarea
              className={`${inputClass} min-h-28`}
              value={shippingAddress}
              onChange={(e) => setShippingAddress(e.target.value)}
              autoComplete="street-address"
              placeholder="Street, city, postcode"
              required
            />
          </label>
          <p className="mt-4 text-sm text-muted">This is a hobby project: no payment is taken, the order is just recorded.</p>
          <p role="alert" className="mt-3 min-h-5 text-sm text-sale">
            {error}
          </p>
          <Button type="submit" full disabled={placing} className="mt-2">
            {placing ? "Placing order…" : "Place order"}
          </Button>
        </form>

        <section aria-labelledby="co-summary" className="rounded-[20px] border border-line p-5 lg:p-6">
          <h2 id="co-summary" className="font-body-bold text-xl lg:text-2xl">
            Your order
          </h2>
          <ul className="mt-4 divide-y divide-line">
            {state.items.map((i) => (
              <li key={lineKey(i)} className="flex items-center gap-3 py-3">
                <img src={i.image} alt="" className="h-14 w-14 rounded-lg bg-card object-cover" />
                <div className="min-w-0 flex-1">
                  <p className="truncate font-body-medium capitalize">{i.name}</p>
                  <p className="text-xs text-muted">
                    {i.size} / {i.color} × {i.quantity}
                  </p>
                </div>
                <span className="font-body-bold">{formatPrice(Math.round(i.price * i.quantity * 100) / 100)}</span>
              </li>
            ))}
          </ul>
          <dl className="mt-4 space-y-3 border-t border-line pt-4">
            <Row label="Subtotal" value={formatPrice(totals.subtotal)} />
            {totals.discount > 0 && <Row label={`Discount (-${totals.discountPercent}%)`} value={`-${formatPrice(totals.discount)}`} accent />}
            <Row label="Delivery Fee" value={formatPrice(totals.delivery)} />
            <div className="flex justify-between border-t border-line pt-3 text-lg">
              <dt>Total</dt>
              <dd className="font-body-bold">{formatPrice(totals.total)}</dd>
            </div>
          </dl>
        </section>
      </div>
    </Container>
  );
};

export default CheckoutPage;
