import { paths } from "../app/paths";
import CompanyBar from "../features/home/components/CompanyBar";
import DressStyleSection from "../features/home/components/DressStyleSection";
import Hero from "../features/home/components/Hero";
import ProductSection from "../features/home/components/ProductSection";
import Testimonial from "../features/home/components/Testimonial";
import { useProducts } from "../features/products/hooks/useProducts";

const HomePage = () => {
  const newArrivals = useProducts("new-arrivals");
  const bestSellers = useProducts("best-sellers");

  return (
    <>
      <Hero />
      <CompanyBar />

      <ProductSection
        title="NEW ARRIVALS"
        products={newArrivals.products}
        viewAllTo={`${paths.shop}?sort=newest`}
      />
      <div className="mx-auto max-w-page border-t border-line" />
      <ProductSection
        title="TOP SELLING"
        products={bestSellers.products}
        viewAllTo={`${paths.shop}?sort=popular`}
      />

      <DressStyleSection />
      <Testimonial />
    </>
  );
};

export default HomePage;
