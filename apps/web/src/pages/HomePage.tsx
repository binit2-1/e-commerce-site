import type { Product } from "@shop/shared";
import backgroundImage from "../assets/imgs/landingImage.png";
import Footer from "../components/layout/Footer";
import CompanyBar from "../features/home/components/CompanyBar";
import DressStyleSection from "../features/home/components/DressStyleSection";
import Hero from "../features/home/components/Hero";
import ProductSection from "../features/home/components/ProductSection";
import Testimonial from "../features/home/components/Testimonial";
import { useProducts } from "../features/products/hooks/useProducts";

const HomePage = () => {
  const newArrivals = useProducts("new-arrivals");
  const bestSellers = useProducts("best-sellers");

  const handleAddToCart = (product: Pick<Product, "product_id" | "name" | "price" | "image_url" | "rating">) => {
    console.log("Added to cart:", product);
    // TODO: implement cart logic
  };

  if (newArrivals.loading || bestSellers.loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl">Loading products...</div>
      </div>
    );
  }

  return (
    <div className="w-screen h-screen relative overflow-x-auto">
      {/* Background Images */}
      <img
        src={backgroundImage}
        alt=""
        className="hidden lg:block absolute top-[100px] left-0 w-screen h-screen object-cover z-0"
      />
      <div className="lg:hidden w-screen h-screen absolute top-0 left-0 bg-[#f2f0f1] z-0"></div>
      <img
        src={backgroundImage}
        alt=""
        className="lg:hidden block absolute top-[550px] -left-132.5 min-w-[1000px] h-auto z-0 "
      />

      <CompanyBar />

      <div className="w-full min-h-screen lg:grid lg:grid-cols-2 pt-[108px] relative z-10">
        <Hero />

        <ProductSection
          title="NEW ARRIVALS"
          products={newArrivals.products}
          onAddToCart={handleAddToCart}
          className="absolute top-[1170px] lg:top-[1150px] lg:left-0 lg:right-0 z-10 lg:px-6"
        />

        {/* Horizontal Separator Line */}
        <div className="absolute top-[1800px] left-0 right-0 z-10">
          <div className="flex justify-center my-16">
            <hr className="w-4/5 border-t-2 border-gray-300" />
          </div>
        </div>

        <ProductSection
          title="BEST SELLERS"
          products={bestSellers.products}
          onAddToCart={handleAddToCart}
          buttonClassName="cursor-pointer"
          className="absolute top-[1900px] lg:top-[1950px] lg:left-0 lg:right-0 z-10 lg:px-6"
        />
      </div>

      <DressStyleSection />
      <Testimonial />
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default HomePage;
