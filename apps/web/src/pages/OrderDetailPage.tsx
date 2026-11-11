import type { Order } from "@shop/shared";
import { Link, useLocation, useParams } from "react-router-dom";
import { paths } from "../app/paths";
import Container from "../components/layout/Container";
import Breadcrumbs from "../components/ui/Breadcrumbs";
import { ApiRequestError, apiGet } from "../lib/api-client";
import { formatDate, formatPrice } from "../lib/format";
import { useApi } from "../lib/useApi";
import NotFoundPage from "./NotFoundPage";

const OrderDetailPage = () => {
  const { orderId = "" } = useParams<{ orderId: string }>();
  const placed = (useLocation().state as { placed?: boolean } | null)?.placed;
  const { data: order, error } = useApi((signal) => apiGet<Order>(`/api/orders/${orderId}`, signal), orderId);

  if (error instanceof ApiRequestError && error.status === 404) return <NotFoundPage />;
  if (error && !order) return <p className="py-32 text-center">Couldn&apos;t load this order.</p>;
  if (!order) return <p className="py-32 text-center text-muted">Loading…</p>;

  return (
    <Container>
      <Breadcrumbs
        items={[{ label: "Home", to: paths.home }, { label: "My orders", to: paths.orders }, { label: `Order #${order.order_id}` }]}
      />

      {placed && (
        <p role="status" className="mb-5 rounded-[20px] bg-surface p-5 font-body-medium">
          Thanks! Your order #{order.order_id} has been placed.
        </p>
      )}

      <div className="flex flex-wrap items-center gap-3">
        <h1 className="font-display text-[32px] lg:text-[40px]">ORDER #{order.order_id}</h1>
        <span className="rounded-full bg-surface px-3 py-1 text-sm capitalize">{order.status}</span>
      </div>
      <p className="mt-1 text-muted">Placed on {formatDate(order.created_at)}</p>

      <div className="mb-16 mt-6 flex flex-col gap-5 lg:mb-24 lg:grid lg:grid-cols-[1fr_505px] lg:items-start">
        <ul className="divide-y divide-line rounded-[20px] border border-line px-5">
          {order.items.map((i, idx) => (
            <li key={idx} className="flex items-center gap-4 py-4">
              <img src={i.image_url} alt="" className="h-20 w-20 shrink-0 rounded-lg bg-card object-cover" />
              <div className="min-w-0 flex-1">
                {i.product_id ? (
                  <Link to={paths.product(i.product_id)} className="block truncate font-body-bold capitalize">
                    {i.name}
                  </Link>
                ) : (
                  <p className="truncate font-body-bold capitalize">{i.name}</p>
                )}
                <p className="text-sm text-muted">
                  Size {i.size} · {i.color} · Qty {i.quantity}
                </p>
              </div>
              <span className="font-body-bold">{formatPrice(Math.round(i.price * i.quantity * 100) / 100)}</span>
            </li>
          ))}
        </ul>

        <div className="space-y-5">
          <section className="rounded-[20px] border border-line p-5">
            <h2 className="font-body-bold text-xl">Delivery</h2>
            <p className="mt-2">{order.shipping_name}</p>
            <p className="whitespace-pre-line text-muted">{order.shipping_address}</p>
          </section>
          <section className="rounded-[20px] border border-line p-5">
            <h2 className="font-body-bold text-xl">Summary</h2>
            <dl className="mt-3 space-y-2">
              <div className="flex justify-between"><dt className="text-black/60">Subtotal</dt><dd>{formatPrice(order.subtotal)}</dd></div>
              {order.discount > 0 && (
                <div className="flex justify-between text-sale"><dt>Discount{order.promo_code ? ` (${order.promo_code})` : ""}</dt><dd>-{formatPrice(order.discount)}</dd></div>
              )}
              <div className="flex justify-between"><dt className="text-black/60">Delivery Fee</dt><dd>{formatPrice(order.delivery)}</dd></div>
              <div className="flex justify-between border-t border-line pt-3 text-lg font-body-bold"><dt>Total</dt><dd>{formatPrice(order.total)}</dd></div>
            </dl>
          </section>
        </div>
      </div>
    </Container>
  );
};

export default OrderDetailPage;
