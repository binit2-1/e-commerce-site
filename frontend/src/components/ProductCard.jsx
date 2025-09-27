import React from 'react';

const ProductCard = ({
  product_id,
  name,
  price,
  image_url,
  rating,
  onAddToCart
}) => {
  return (
    <div className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
      {/* Product Image */}
      <img 
        src={image_url} 
        alt={name}
        className="h-80 w-72 object-cover rounded-t-xl"
      />
      
      {/* Product Details */}
      <div className="px-4 py-3 w-72">
        {/* Product Name */}
        <p className="text-lg font-bold text-black truncate block capitalize mb-2">
          {name}
        </p>
        
        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center">
            <span className="text-yellow-400 text-sm">★★★★☆</span>
          </div>
          <span className="text-xs text-gray-500">
            ({rating}/5)
          </span>
        </div>
        
        {/* Price and Add to Cart */}
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold text-black">
            ${price}
          </p>
          
          <button
            onClick={() => onAddToCart && onAddToCart({ product_id, name, price, image_url, rating })}
            className="bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors duration-300 active:scale-95"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard