import { useState } from "react";
import type { Product } from "@shop/shared";
import ProductCard from "../../products/components/ProductCard";

interface ProductSectionProps {
  title: string;
  products: Product[];
  /** Absolute-positioning classes for the section wrapper (preserves the existing page layout). */
  className: string;
  buttonClassName?: string;
  onAddToCart?: (product: Pick<Product, "product_id" | "name" | "price" | "image_url" | "rating">) => void;
  initialCount?: number;
}

const ProductSection = ({
  title,
  products,
  className,
  buttonClassName = "",
  onAddToCart,
  initialCount = 4,
}: ProductSectionProps) => {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? products : products.slice(0, initialCount);

  return (
    <div className={className}>
      <h2 className="lg:text-3xl font-bold text-center mb-6 lg:mb-16">{title}</h2>
      <div className="flex flex-wrap gap-4 lg:flex-cols justify-center lg:gap-20">
        {visible.map((product) => (
          <ProductCard
            key={product.product_id}
            product_id={product.product_id}
            name={product.name}
            price={product.price}
            image_url={product.image_url}
            rating={product.rating}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
      <div className="flex justify-center mt-10">
        <button
          onClick={() => setShowAll((v) => !v)}
          className={`bg-transparent justify-center border-[1px] border-gray-200 rounded-[200px] text-sm p-3 font-[satoshi-regular] ${buttonClassName}`}
        >
          {showAll ? "Show Less" : "View All"}
        </button>
      </div>
    </div>
  );
};

export default ProductSection;
