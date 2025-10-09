import React from "react";
import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import CategoryPage from "./pages/CategoryPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import TopSignIn from "./components/TopSignIn";
import Navbar from "./components/Navbar";
import CartPage from "./pages/CartPage";
import TestimonialCard from "./components/ui/TestimonialCard";

const App = () => {
  return (
    <div className="w-screen h-screen relative">
      <div className="sticky top-0 z-50 bg-white shadow-sm transition-transform duration-300">
        <TopSignIn />
        <Navbar />
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
