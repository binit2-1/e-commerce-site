import React, { useState } from 'react'
import TestimonialCard from './ui/TestimonialCard'

const Testimonial = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  
  const testimonials = [
    {
      name: "Sarah M.",
      rating: 5,
      testimonial: "I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations.",
      verified: true
    },
    {
      name: "Alex K.",
      rating: 5,
      testimonial: "Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co. The range of options they offer is truly remarkable, catering to a variety of tastes and occasions.",
      verified: true
    },
    {
      name: "James L.",
      rating: 5,
      testimonial: "As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon Shop.co. The selection of clothes is not only diverse but also on-point with the latest trends.",
      verified: true
    },
    {
      name: "Mooen",
      rating: 5,
      testimonial: "As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon Shop.co. The selection of clothes is not only diverse but also on-point with the latest trends.",
      verified: true
    }
  ]

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <div className="w-full bg-white py-16 px-4">
      {/* Header Section */}
      <div className="flex items-center justify-between max-w-7xl mx-auto mb-12">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-[neue-montreal-bold] text-black">
          OUR HAPPY CUSTOMERS
        </h2>
        
        {/* Navigation Arrows */}
        <div className="flex items-center gap-4">
          <button
            onClick={prevTestimonial}
            className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={nextTestimonial}
            className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Testimonials Container */}
      <div className="max-w-7xl mx-auto">
        <div className="flex gap-6 overflow-hidden">
          {/* Desktop: Show multiple cards */}
          <div className="hidden lg:flex gap-6 w-full">
            {[0, 1, 2].map((offset) => {
              const index = (currentIndex + offset) % testimonials.length
              return (
                <div key={index} className="flex-1">
                  <TestimonialCard {...testimonials[index]} />
                </div>
              )
            })}
          </div>
          
          {/* Tablet: Show 2 cards */}
          <div className="hidden md:flex lg:hidden gap-6 w-full">
            {[0, 1].map((offset) => {
              const index = (currentIndex + offset) % testimonials.length
              return (
                <div key={index} className="flex-1">
                  <TestimonialCard {...testimonials[index]} />
                </div>
              )
            })}
          </div>
          
          {/* Mobile: Show 1 card */}
          <div className="flex md:hidden w-full">
            <div className="w-full">
              <TestimonialCard {...testimonials[currentIndex]} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Testimonial