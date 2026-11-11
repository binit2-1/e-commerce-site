import { Link } from "react-router-dom";
import { paths } from "../app/paths";
import Container from "../components/layout/Container";
import Breadcrumbs from "../components/ui/Breadcrumbs";
import CartItemRow from "../features/cart/components/CartItemRow";
import OrderSummary from "../features/cart/components/OrderSummary";
import { lineKey } from "../features/cart/cart";
import { useCart } from "../features/cart/useCart";

const CartPage = () => {
  const { state, setQuantity, removeItem } = useCart();

  return (
    <Container>
      <div className="border-t border-line">
        <Breadcrumbs items={[{ label: "Home", to: paths.home }, { label: "Cart" }]} />
      </div>

      <h1 className="font-display text-[32px] lg:text-[40px]">YOUR CART</h1>

      {state.items.length === 0 ? (
        <div className="my-10 rounded-[20px] bg-surface px-6 py-16 text-center">
          <p className="font-body-bold text-xl">Your cart is empty</p>
          <p className="mt-2 text-muted">Looks like you haven&apos;t added anything yet.</p>
          <Link
            to={paths.shop}
            className="mt-6 inline-block rounded-full bg-black px-10 py-3.5 font-body-medium text-white hover:bg-black/85"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="mb-16 mt-5 flex flex-col gap-5 lg:mb-24 lg:mt-6 lg:grid lg:grid-cols-[1fr_505px] lg:items-start">
          <ul className="divide-y divide-line rounded-[20px] border border-line p-3.5 lg:p-6">
            {state.items.map((item) => (
              <CartItemRow
                key={lineKey(item)}
                item={item}
                onQuantity={(q) => setQuantity(lineKey(item), q)}
                onRemove={() => removeItem(lineKey(item))}
              />
            ))}
          </ul>
          <OrderSummary />
        </div>
      )}
    </Container>
  );
};

export default CartPage;
