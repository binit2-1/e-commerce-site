import React from 'react';

const ProductCard = ({
  product_id,
  name,
  price,
  image_url,
  rating,
  onAddToCart
}) => {
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push('★');
    }
    if (hasHalfStar) {
      stars.push('☆');
    }
    while (stars.length < 5) {
      stars.push('☆');
    }
    return stars.join('');
  };

  return (
    <div className="w-40 sm:w-48 md:w-60 lg:w-72 bg-white rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
      {/* Product Image */}
      <img 
        src={image_url} 
        alt={name}
        className="h-40 sm:h-48 md:h-60 lg:h-80 w-full object-cover rounded-t-xl"
      />
      
      {/* Product Details */}
      <div className="px-2 sm:px-3 lg:px-4 py-2 lg:py-3 w-full">
        {/* Product Name */}
        <p className="text-sm sm:text-base lg:text-lg font-bold text-black truncate block capitalize mb-1 lg:mb-2">
          {name}
        </p>
        
        {/* Rating */}
        <div className="flex items-center gap-1 lg:gap-2 mb-2 lg:mb-3">
          <div className="flex items-center">
            <span className="text-yellow-400 text-xs sm:text-sm">{renderStars(rating)}</span>
          </div>
          <span className="text-xs text-gray-500">
            ({rating}/5)
          </span>
        </div>
        
        {/* Price and Add to Cart */}
        <div className="flex items-center justify-between">
          <p className="text-sm sm:text-base lg:text-lg font-semibold text-black">
            ${price}
          </p>
          
          <button
            onClick={() => onAddToCart && onAddToCart({ product_id, name, price, image_url, rating })}
            className="bg-black text-white px-2 py-1 sm:px-3 sm:py-1.5 lg:px-4 lg:py-2 rounded text-xs sm:text-sm font-medium hover:bg-gray-800 transition-colors duration-300 active:scale-95"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;