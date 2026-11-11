import { Link } from "react-router-dom";
import { paths } from "../../../app/paths";
import { Trash } from "../../../components/icons";
import QuantityStepper from "../../../components/ui/QuantityStepper";
import { formatPrice } from "../../../lib/format";
import { MAX_QUANTITY, lineKey, type CartItem } from "../cart";

interface CartItemRowProps {
  item: CartItem;
  onQuantity: (quantity: number) => void;
  onRemove: () => void;
}

const CartItemRow = ({ item, onQuantity, onRemove }: CartItemRowProps) => (
  <li className="flex gap-3.5 py-5 first:pt-0 last:pb-0 lg:gap-5" data-line={lineKey(item)}>
    <Link
      to={paths.product(item.productId)}
      className="h-[99px] w-[99px] shrink-0 overflow-hidden rounded-lg bg-card lg:h-[124px] lg:w-[124px]"
    >
      <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
    </Link>

    <div className="flex min-w-0 flex-1 flex-col justify-between">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <Link to={paths.product(item.productId)} className="block truncate font-body-bold text-base capitalize lg:text-xl">
            {item.name}
          </Link>
          <p className="mt-1 text-xs lg:text-sm">
            Size: <span className="text-muted">{item.size}</span>
          </p>
          <p className="text-xs lg:text-sm">
            Color: <span className="text-muted">{item.color}</span>
          </p>
        </div>
        <button type="button" aria-label={`Remove ${item.name}`} onClick={onRemove} className="text-sale">
          <Trash width={20} height={20} />
        </button>
      </div>

      <div className="flex items-end justify-between gap-3">
        <span className="font-body-bold text-xl lg:text-2xl">{formatPrice(item.price)}</span>
        <QuantityStepper value={item.quantity} onChange={onQuantity} max={MAX_QUANTITY} compact />
      </div>
    </div>
  </li>
);

export default CartItemRow;
