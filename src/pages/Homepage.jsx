import React from 'react'
import star from '../assets/imgs/star.png'

const Homepage = () => {
  return (
    <div className='w-full min-h-screen lg:grid lg:grid-cols-2 pt-[108px] relative z-10'>
      {/* Left column - Text content */}
      <div className='flex flex-col relative z-20'>
        <h1 className='pl-3 pt-4 text-[36px] leading-9  lg:leading-none lg:text-6xl text-black lg:px-40 lg:pt-20 lg:m-4 font-[neue-montreal-bold]'>
          FIND CLOTHES <br /> THAT MATCHES <br/> YOUR STYLE
        </h1>
        <p className='hidden lg:block lg:text-lg  text-gray-700  lg:px-40 lg:m-4 font-[satoshi-light]'>
          Browse through our diverse range of meticulously crafted garments, designed <br/> 
          to bring out your individuality and cater to your sense of style.
        </p>
        <p className='lg:hidden text-[14px] pt-4 text-gray-700 px-3 lg:m-4 font-[satoshi-light]'>
          Browse through our diverse range of meticulously crafted<br/>garments, designed  
          to bring out your individuality and<br/>cater to your sense of style.
        </p>
        <button className='lg:w-[180px] w-[390px] h-[50px] mx-auto my-5 lg:h-[50px] cursor-pointer bg-black text-white lg:text-lg font-[satoshi-medium] rounded-4xl lg:ml-44 lg:mt-4'>
          Shop Now
        </button>
        {/* large screen interface */}
        <div className='hidden lg:flex flex-row ml-20 items-center'>
          <div className='flex flex-col'>
            <h2 className='text-4xl text-black pl-32 pt-20 -ml-7 font-[satoshi-bold]'>200+</h2>
            <p className='text-md text-gray-700 pl-32 -ml-7 font-[satoshi-light]'>International Brands</p>
          </div>
          <hr className='border-l-2 border-gray-300 h-20 ml-8 mt-18' />
          <div className='flex flex-col'>
            <h2 className='text-4xl text-black pl-8 pt-20 font-[satoshi-bold]'>2,000+</h2>
            <p className='text-md text-gray-700 pl-8 font-[satoshi-light]'>High-Quality Products</p>
          </div>
          <hr className='border-l-2 border-gray-300 h-20 ml-8 mt-18' />
          <div className='flex flex-col'>
            <h2 className='text-4xl text-black pl-8 pt-20 font-[satoshi-bold]'>30,000+</h2>
            <p className='text-md text-gray-700 pl-8 font-[satoshi-light]'>Happy Customers</p>
          </div>
        </div>
      </div>
        {/* mobile interface */}
        <div className='flex flex-col lg:hidden -ml-5 items-center justify-center'>
          <div className='flex flex-row '>
            <div className='flex flex-col'>
              <h2 className='text-[24px] text-black pl-14 pt-5 -ml-7 font-[satoshi-bold]'>200+</h2>
              <p className='text-[12px] text-gray-700 pl-14 -ml-7 font-[satoshi-light]'>International Brands</p>
            </div>
            <hr className='border-l-2 border-gray-300 h-15 ml-8 mt-3' />
            <div className='flex flex-col'>
              <h2 className='text-[24px] text-black pl-8 pt-5 font-[satoshi-bold]'>2,000+</h2>
              <p className='text-[12px] text-gray-700 pl-8 font-[satoshi-light]'>High-Quality Products</p>
            </div>
          </div>
          <div className='flex flex-col items-center'>
            <h2 className='text-[24px] text-black pt-5 pl-6 font-[satoshi-bold]'>30,000+</h2>
            <p className='text-[12px] text-gray-700 pl-4 font-[satoshi-light]'>Happy Customers</p>
          </div>
        </div>
      
      {/* Right column - Image will show through */}
      <div className='flex flex-col relative z-50'>
        <img src ={star} alt="Star" className="w-[104px] h-[104px] mx-160 mt-40" />
        <img src ={star} alt="Star" className="w-[56px] h-[56px] mt-48" />
      </div>
    </div>
  )
}

export default Homepage