import React, { useState, useEffect } from "react";
import star from "../assets/imgs/star.png";
import backgroundImage from "../assets/imgs/landingImage.png";
import ProductCard from "../components/ProductCard";
import CompanyBar from "../components/CompanyBar";
import casualImage from "../assets/imgs/casual.png";
import formalImage from "../assets/imgs/formal.png";
import partyImage from "../assets/imgs/party.png";
import gymImage from "../assets/imgs/gym.png"; 
import Testimonial from "../components/Testimonial";

const Homepage = () => {
  const [products, setProducts] = useState([]);
  const [allNewArrivals, setAllNewArrivals] = useState([]);
  const [showAllNewArrivals, setShowAllNewArrivals] = useState(false);
  const [allBestSellers, setAllBestSellers] = useState([]);
  const [showAllBestSellers, setShowAllBestSellers] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        // Fetch all products
        const allProductsResponse = await fetch(
          "http://localhost:3000/api/products"
        );
        const allProductsData = await allProductsResponse.json();
        setProducts(allProductsData);

        // Fetch new arrivals (sorted by created_at)
        const newArrivalsResponse = await fetch(
          "http://localhost:3000/api/products/new-arrivals"
        );
        const newArrivalsData = await newArrivalsResponse.json();
        setAllNewArrivals(newArrivalsData);

        // Fetch best sellers (sorted by rating)
        const bestSellersResponse = await fetch(
          "http://localhost:3000/api/products/best-sellers"
        );
        const bestSellersData = await bestSellersResponse.json();
        setAllBestSellers(bestSellersData);

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

  const newArrivalsToDisplay = showAllNewArrivals
    ? allNewArrivals
    : allNewArrivals.slice(0, 4);

  const bestSellersToDisplay = showAllBestSellers
    ? allBestSellers
    : allBestSellers.slice(0, 4);

  if (loading) {
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
        className="hidden lg:block absolute top-[100px] left-0 w-screen h-screen object-cover z-0"
      />
      <div className="lg:hidden w-screen h-screen absolute top-0 left-0 bg-[#f2f0f1] z-0"></div>
      <img
        src={backgroundImage}
        className="lg:hidden block absolute top-[550px] -left-132.5 min-w-[1000px] h-auto z-0 "
      />

      {/* CompanyBar */}
      <CompanyBar />

      {/* Hero Section */}
      <div className="w-full min-h-screen lg:grid lg:grid-cols-2 pt-[108px] relative z-10">
        {/* Left column - Text content */}
        <div className="flex flex-col relative z-20">
          <h1 className="pl-3 pt-4 text-[36px] leading-9  lg:leading-none lg:text-6xl text-black lg:px-40 lg:pt-20 lg:m-4 font-[neue-montreal-bold]">
            FIND CLOTHES <br /> THAT MATCHES <br /> YOUR STYLE
          </h1>
          <p className="hidden lg:block lg:text-lg  text-gray-700  lg:px-40 lg:m-4 font-[satoshi-light]">
            Browse through our diverse range of meticulously crafted garments,
            designed <br />
            to bring out your individuality and cater to your sense of style.
          </p>
          <p className="lg:hidden text-[14px] pt-4 text-gray-700 px-3 lg:m-4 font-[satoshi-light]">
            Browse through our diverse range of meticulously crafted
            <br />
            garments, designed to bring out your individuality and
            <br />
            cater to your sense of style.
          </p>
          <button className="lg:w-[180px] w-[390px] h-[50px] mx-auto my-5 lg:h-[50px] cursor-pointer bg-black text-white lg:text-lg font-[satoshi-medium] rounded-4xl lg:ml-44 lg:mt-4">
            Shop Now
          </button>
          {/* large screen interface */}
          <div className="hidden lg:flex flex-row ml-20 items-center">
            <div className="flex flex-col">
              <h2 className="text-4xl text-black pl-32 pt-20 -ml-7 font-[satoshi-bold]">
                200+
              </h2>
              <p className="text-md text-gray-700 pl-32 -ml-7 font-[satoshi-light]">
                International Brands
              </p>
            </div>
            <hr className="border-l-2 border-gray-300 h-20 ml-8 mt-18" />
            <div className="flex flex-col">
              <h2 className="text-4xl text-black pl-8 pt-20 font-[satoshi-bold]">
                2,000+
              </h2>
              <p className="text-md text-gray-700 pl-8 font-[satoshi-light]">
                High-Quality Products
              </p>
            </div>
            <hr className="border-l-2 border-gray-300 h-20 ml-8 mt-18" />
            <div className="flex flex-col">
              <h2 className="text-4xl text-black pl-8 pt-20 font-[satoshi-bold]">
                30,000+
              </h2>
              <p className="text-md text-gray-700 pl-8 font-[satoshi-light]">
                Happy Customers
              </p>
            </div>
          </div>
        </div>
        {/* mobile interface */}
        <div className="flex flex-col lg:hidden -ml-5 items-center justify-center">
          <div className="flex flex-row ">
            <div className="flex flex-col">
              <h2 className="text-[24px] text-black pl-14 pt-5 -ml-7 font-[satoshi-bold]">
                200+
              </h2>
              <p className="text-[12px] text-gray-700 pl-14 -ml-7 font-[satoshi-light]">
                International Brands
              </p>
            </div>
            <hr className="border-l-2 border-gray-300 h-15 ml-8 mt-3" />
            <div className="flex flex-col">
              <h2 className="text-[24px] text-black pl-8 pt-5 font-[satoshi-bold]">
                2,000+
              </h2>
              <p className="text-[12px] text-gray-700 pl-8 font-[satoshi-light]">
                High-Quality Products
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <h2 className="text-[24px] text-black pt-5 pl-6 font-[satoshi-bold]">
              30,000+
            </h2>
            <p className="text-[12px] text-gray-700 pl-4 font-[satoshi-light]">
              Happy Customers
            </p>
          </div>
        </div>

        {/* Right column - Image will show through */}
        <div className="hidden lg:flex flex-col relative z-50">
          <img
            src={star}
            alt="Star"
            className="w-[104px] h-[104px] mx-160 mt-40"
          />
          <img src={star} alt="Star" className="w-[56px] h-[56px] mt-48" />
        </div>
        {/* mobile right column - Image will show through */}
        <div className="lg:hidden flex flex-col relative z-50">
          <img
            src={star}
            alt="Star"
            className="w-[104px] h-[104px] mx-70 mt-10"
          />
          <img src={star} alt="Star" className="w-[56px] h-[56px] ml-5 mt-8 " />
        </div>

        {/* New Arrivals Section */}
        <div className="absolute top-[1170px] lg:top-[1150px] lg:left-0 lg:right-0 z-10 lg:px-6">
          <h2 className="lg:text-3xl font-bold text-center mb-6 lg:mb-16">
            NEW ARRIVALS
          </h2>
          <div className="flex flex-wrap gap-4 lg:flex-cols justify-center lg:gap-20">
            {newArrivalsToDisplay.map((product) => (
              <ProductCard
                key={product.product_id}
                product_id={product.product_id}
                name={product.name}
                price={product.price}
                image_url={product.image_url}
                rating={product.rating}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
          <div className="flex justify-center mt-10">
            <button className="bg-transparent justify-center border-[1px] border-gray-200 rounded-[200px] text-sm p-3 font-[satoshi-regular]`">
              {" "}
              View All{" "}
            </button>
          </div>
        </div>

        {/* Horizontal Separator Line */}
        <div className="absolute top-[1800px] left-0 right-0 z-10">
          <div className="flex justify-center my-16">
            <hr className="w-4/5 border-t-2 border-gray-300" />
          </div>
        </div>

        {/* Best Sellers Section */}
        <div className="absolute top-[1900px] lg:top-[1950px] lg:left-0 lg:right-0 z-10 lg:px-6">
          <h2 className="lg:text-3xl font-bold text-center mb-6 lg:mb-16">
            BEST SELLERS
          </h2>
          <div className="flex flex-wrap gap-4 lg:flex-cols justify-center lg:gap-20">
            {bestSellersToDisplay.map((product) => (
              <ProductCard
                key={product.product_id}
                product_id={product.product_id}
                name={product.name}
                price={product.price}
                image_url={product.image_url}
                rating={product.rating}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
          <div className="flex justify-center mt-10">
            <button className="bg-transparent justify-center border-[1px] border-gray-200 rounded-[200px] text-sm p-3 font-[satoshi-regular]` cursor-pointer">
              {" "}
              View All{" "}
            </button>
          </div>
        </div>
      </div>

      {/* Browse by Dress Style Section */}
      <div className="flex justify-center">
        <div className="lg:h-[866px] lg:w-[1410px] h-[975px] w-[340px] bg-[#F0F0F0] rounded-2xl lg:mt-[1800px] mt-[1670px] mb-[100px]">
          <div className="flex justify-center font-[neue-montreal-bold] mt-12 lg:mt-20 text-2xl lg:text-6xl px-16 lg:px-0 text-center">
            BROWSE BY DRESS STYLE
          </div>
          <div className="flex flex-col gap-4 lg:grid lg:grid-cols-5 lg:grid-rows-5 lg:gap-4 mt-5 lg:mt-26 mx-6">
            <div className="lg:col-span-2 lg:row-span-2">
              <div className="lg:h-[289px] h-[190px] w-full rounded-2xl relative">
                <div className="absolute top-4 left-4 text-black text-xl lg:text-2xl font-[satoshi-bold] z-10">
                  Casual
                </div>
                <img 
                  src={casualImage} 
                  alt="Casual" 
                  className="lg:h-full w-full h-[190px] rounded-2xl object-cover" 
                />
              </div>
            </div>
            
            <div className="lg:col-span-3 lg:row-span-2 lg:col-start-3">
              <div className="lg:h-[289px] h-[190px] w-full rounded-2xl relative">
                <div className="absolute top-4 left-4 text-black text-xl lg:text-2xl font-[satoshi-bold] z-10">
                  Formal
                </div>
                <img 
                  src={formalImage} 
                  alt="Formal" 
                  className="h-full w-full rounded-2xl object-cover" 
                />
              </div>
            </div>
            
            <div className="lg:col-span-3 lg:row-span-2 lg:row-start-3">
              <div className="lg:h-[289px] h-[190px] w-full rounded-2xl relative">
                <div className="absolute top-4 left-4 text-black text-xl lg:text-2xl font-[satoshi-bold] z-10">
                  Party
                </div>
                <img 
                  src={partyImage} 
                  alt="Party" 
                  className="h-full w-full rounded-2xl object-cover" 
                />
              </div>
            </div>
            
            <div className="lg:col-span-2 lg:row-span-2 lg:col-start-4 lg:row-start-3">
              <div className="lg:h-[289px] h-[190px] w-full rounded-2xl relative">
                <div className="absolute top-4 left-4 text-black text-xl lg:text-2xl font-[satoshi-bold] z-10">
                  Gym
                </div>
                <img 
                  src={gymImage} 
                  alt="Gym" 
                  className="h-full w-full rounded-2xl object-cover" 
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*Testimonials Section*/}
      <Testimonial />
    </div>
  );
};

export default Homepage;
