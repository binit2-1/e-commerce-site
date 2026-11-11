import { useApi } from "../../../lib/useApi";
import { fetchRelatedProducts } from "../../products/api";
import ProductCard from "../../products/components/ProductCard";

const RelatedProducts = ({ productId }: { productId: number }) => {
  const { data } = useApi((signal) => fetchRelatedProducts(productId, signal), String(productId));
  if (!data || data.length === 0) return null;

  return (
    <section className="py-12 lg:py-[72px]" aria-labelledby="related-heading">
      <h2 id="related-heading" className="text-center font-display text-3xl lg:text-5xl">
        YOU MIGHT ALSO LIKE
      </h2>
      <div className="mt-8 grid grid-cols-2 gap-4 lg:mt-14 lg:grid-cols-4 lg:gap-5">
        {data.map((p) => (
          <ProductCard key={p.product_id} {...p} />
        ))}
      </div>
    </section>
  );
};

export default RelatedProducts;
