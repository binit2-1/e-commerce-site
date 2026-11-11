import type { Product } from "@shop/shared";
import { Link } from "react-router-dom";
import { paths } from "../../../app/paths";
import PriceTag from "../../../components/ui/PriceTag";
import StarRating from "../../../components/ui/StarRating";

type ProductCardProps = Pick<Product, "product_id" | "name" | "price" | "old_price" | "image_url" | "rating">;

const ProductCard = ({ product_id, name, price, old_price, image_url, rating }: ProductCardProps) => (
  <Link to={paths.product(product_id)} className="group block min-w-0">
    <div className="aspect-square overflow-hidden rounded-[20px] bg-card">
      <img
        src={image_url}
        alt={name}
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
    </div>
    <h3 className="mt-3 truncate font-body-bold text-base capitalize lg:mt-4 lg:text-xl">{name}</h3>
    <div className="mt-1 lg:mt-2">
      <StarRating rating={rating} size={16} />
    </div>
    <div className="mt-1 lg:mt-2">
      <PriceTag price={price} oldPrice={old_price} />
    </div>
  </Link>
);

export default ProductCard;
