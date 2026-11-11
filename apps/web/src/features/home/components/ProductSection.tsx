import type { Product } from "@shop/shared";
import { Link } from "react-router-dom";
import Container from "../../../components/layout/Container";
import ProductCard from "../../products/components/ProductCard";

interface ProductSectionProps {
  title: string;
  products: Product[];
  viewAllTo: string;
  count?: number;
}

const ProductSection = ({ title, products, viewAllTo, count = 4 }: ProductSectionProps) => (
  <section className="py-12 lg:py-[72px]">
    <Container>
      <h2 className="text-center font-display text-3xl lg:text-5xl">{title}</h2>
      <div className="mt-8 grid grid-cols-2 gap-4 lg:mt-14 lg:grid-cols-4 lg:gap-5">
        {products.slice(0, count).map((p) => (
          <ProductCard key={p.product_id} {...p} />
        ))}
      </div>
      <div className="mt-8 flex justify-center lg:mt-9">
        <Link
          to={viewAllTo}
          className="w-full rounded-full border border-line px-14 py-3.5 text-center font-body-medium hover:bg-surface sm:w-auto"
        >
          View All
        </Link>
      </div>
    </Container>
  </section>
);

export default ProductSection;
