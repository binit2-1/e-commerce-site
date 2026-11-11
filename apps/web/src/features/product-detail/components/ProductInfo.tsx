import type { ProductDetail } from "@shop/shared";
import { useState } from "react";
import { Link } from "react-router-dom";
import { paths } from "../../../app/paths";
import Button from "../../../components/ui/Button";
import Chip from "../../../components/ui/Chip";
import ColorSwatch from "../../../components/ui/ColorSwatch";
import PriceTag from "../../../components/ui/PriceTag";
import QuantityStepper from "../../../components/ui/QuantityStepper";
import StarRating from "../../../components/ui/StarRating";
import { useCart } from "../../cart/useCart";

const Divider = () => <hr className="my-5 border-line" />;

const ProductInfo = ({ product }: { product: ProductDetail }) => {
  const { addItem } = useCart();
  const [color, setColor] = useState(product.colors[0]?.name ?? "");
  const [size, setSize] = useState(product.sizes[0] ?? "");
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const canAdd = Boolean(color && size);

  const onAdd = () => {
    if (!canAdd) return;
    addItem({
      productId: product.product_id,
      name: product.name,
      image: product.image_url,
      price: product.price,
      size,
      color,
      quantity,
    });
    setAdded(true);
  };

  return (
    <div>
      <h1 className="font-display text-2xl uppercase leading-tight lg:text-[40px]">{product.name}</h1>
      <div className="mt-3 lg:mt-3.5">
        <StarRating rating={product.rating} size={20} />
      </div>
      <div className="mt-3 lg:mt-3.5">
        <PriceTag price={product.price} oldPrice={product.old_price} size="lg" />
      </div>
      <p className="mt-4 text-sm text-black/60 lg:text-base">{product.description}</p>

      {product.colors.length > 0 && (
        <>
          <Divider />
          <p className="text-base text-black/60">Select Colors</p>
          <div className="mt-4 flex flex-wrap gap-4">
            {product.colors.map((c) => (
              <ColorSwatch key={c.name} {...c} selected={color === c.name} onClick={() => setColor(c.name)} />
            ))}
          </div>
        </>
      )}

      {product.sizes.length > 0 && (
        <>
          <Divider />
          <p className="text-base text-black/60">Choose Size</p>
          <div className="mt-4 flex flex-wrap gap-2 lg:gap-3">
            {product.sizes.map((s) => (
              <Chip key={s} size="lg" selected={size === s} onClick={() => setSize(s)}>
                {s}
              </Chip>
            ))}
          </div>
        </>
      )}

      <Divider />
      <div className="flex gap-3 sm:gap-5">
        <QuantityStepper value={quantity} onChange={setQuantity} max={10} className="w-[120px] shrink-0 sm:w-[170px]" />
        <Button full disabled={!canAdd} onClick={onAdd}>
          Add to Cart
        </Button>
      </div>
      <p className="mt-3 min-h-5 text-sm" aria-live="polite">
        {added && (
          <span className="text-muted">
            Added to your cart.{" "}
            <Link to={paths.cart} className="text-black underline">
              View cart
            </Link>
          </span>
        )}
      </p>
    </div>
  );
};

export default ProductInfo;
