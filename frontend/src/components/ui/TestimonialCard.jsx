import React from 'react'

const TestimonialCard = ({ 
  name = "Alex K.", 
  rating = 5, 
  testimonial = "Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co. The range of options they offer is truly remarkable, catering to a variety of tastes and occasions.",
  verified = true 
}) => {
  // Render 5 stars (filled based on rating)
  const renderStars = () => {
    return Array.from({ length: 5 }, (_, index) => (
      <svg
        key={index}
        className={`w-5 h-5 ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow duration-200 max-w-md h-80 flex flex-col">
      {/* Rating Stars */}
      <div className="flex items-center gap-1 mb-4">
        {renderStars()}
      </div>

      {/* Name and Verification */}
      <div className="flex items-center gap-2 mb-4">
        <h3 className="text-2xl font-[neue-montreal-bold] text-black">{name}</h3>
        {verified && (
          <div className="flex items-center justify-center w-5 h-5 bg-green-500 rounded-full">
            <svg
              className="w-3 h-3 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        )}
      </div>

      {/* Testimonial Text */}
      <p className="text-gray-600 text-lg font-[satoshi-regular] leading-relaxed flex-1">
        "{testimonial}"
      </p>
    </div>
  )
}

export default TestimonialCard