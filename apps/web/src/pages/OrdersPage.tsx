import type { OrderSummary } from "@shop/shared";
import { Link } from "react-router-dom";
import { paths } from "../app/paths";
import Container from "../components/layout/Container";
import Breadcrumbs from "../components/ui/Breadcrumbs";
import { apiGet } from "../lib/api-client";
import { formatDate, formatPrice } from "../lib/format";
import { useApi } from "../lib/useApi";

const OrdersPage = () => {
  const { data, loading, error } = useApi((signal) => apiGet<OrderSummary[]>("/api/orders", signal), "orders");

  return (
    <Container>
      <Breadcrumbs items={[{ label: "Home", to: paths.home }, { label: "My orders" }]} />
      <h1 className="font-display text-[32px] lg:text-[40px]">MY ORDERS</h1>

      <div className="mb-16 mt-6 lg:mb-24">
        {error && !data ? (
          <p className="rounded-[20px] bg-surface p-8 text-center">Couldn&apos;t load your orders.</p>
        ) : loading && !data ? (
          <p className="text-muted">Loading…</p>
        ) : data && data.length === 0 ? (
          <div className="rounded-[20px] bg-surface px-6 py-16 text-center">
            <p className="font-body-bold text-xl">No orders yet</p>
            <Link to={paths.shop} className="mt-4 inline-block underline">
              Start shopping
            </Link>
          </div>
        ) : (
          <ul className="divide-y divide-line rounded-[20px] border border-line">
            {data?.map((o) => (
              <li key={o.order_id}>
                <Link to={paths.order(o.order_id)} className="flex flex-wrap items-center justify-between gap-3 p-5 hover:bg-surface/60">
                  <div>
                    <p className="font-body-bold text-lg">Order #{o.order_id}</p>
                    <p className="text-sm text-muted">
                      {formatDate(o.created_at)} · {o.item_count} item{o.item_count === 1 ? "" : "s"}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="rounded-full bg-surface px-3 py-1 text-xs capitalize">{o.status}</span>
                    <span className="font-body-bold text-lg">{formatPrice(o.total)}</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Container>
  );
};

export default OrdersPage;
