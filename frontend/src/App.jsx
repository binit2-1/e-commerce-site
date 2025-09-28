import React from "react";
import { Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import Homepage from "./pages/Homepage";
import CategoryPage from "./pages/CategoryPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import TopSignIn from "./components/TopSignIn";
import Navbar from "./components/Navbar";
import backgroundImage from "./assets/imgs/landingImage.png";
import CompanyBar from "./components/CompanyBar";
import CartPage from "./pages/CartPage";
import ProductCard from "./components/ProductCard";

const App = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        // Fetch all products
        const allProductsResponse = await fetch(
          "http://localhost:3000/api/products"
        );
        const allProductsData = await allProductsResponse.json();
        setAllProducts(allProductsData);

        // Fetch new arrivals (sorted by created_at)
        const newArrivalsResponse = await fetch(
          "http://localhost:3000/api/products/new-arrivals"
        );
        const newArrivalsData = await newArrivalsResponse.json();
        setNewArrivals(newArrivalsData);

        // Fetch best sellers (sorted by rating)
        const bestSellersResponse = await fetch(
          "http://localhost:3000/api/products/best-sellers"
        );
        const bestSellersData = await bestSellersResponse.json();
        setBestSellers(bestSellersData);

        console.log("All Products:", allProductsData);
        console.log("New Arrivals:", newArrivalsData);
        console.log("Best Sellers:", bestSellersData);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchAllProducts();
  }, []);

  const handleAddToCart = (product) => {
    console.log("Added to cart:", product);
    // Implement your add to cart logic here
  };

  return (
    <div className="w-screen h-screen relative overflow-x-auto">
      <img
        src={backgroundImage}
        className="hidden lg:block absolute top-[100px] left-0 w-screen h-screen object-cover z-0"
      />
      <div className="lg:hidden w-screen h-screen absolute top-0 left-0 bg-[#f2f0f1] z-0"></div>
      <img
        src={backgroundImage}
        className="lg:hidden block absolute top-[550px] -left-132.5 min-w-[1000px] h-auto z-0 "
      />
      <TopSignIn />
      <Navbar />
      <CompanyBar />
      <div className="absolute top-[1400px] left-0 right-0 z-10">
        {products.map((p) => {
          return (
            <ProductCard
              key={p.product_id}
              name={p.name}
              price={p.price}
              image_url={p.image_url}
              rating={p.rating}
              onAddToCart={handleAddToCart}
            />
          );
        })}
      </div>
      <div className="relative z-20">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/category" element={<CategoryPage />} />
          <Route path="/product" element={<ProductDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
