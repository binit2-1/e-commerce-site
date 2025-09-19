import React from 'react'
import star from '../assets/imgs/star.png'

const Homepage = () => {
  return (
    <div className='w-full min-h-screen grid grid-cols-2 pt-[108px] relative z-10'>
      {/* Left column - Text content */}
      <div className='flex flex-col relative z-20'>
        <h1 className='text-6xl text-black px-40 pt-20 m-4 font-[neue-montreal-bold]'>
          FIND CLOTHES <br /> THAT MATCHES <br/> YOUR STYLE
        </h1>
        <p className='text-lg text-gray-700 px-40 m-4 font-[satoshi-light]'>
          Browse through our diverse range of meticulously crafted garments, designed <br/> 
          to bring out your individuality and cater to your sense of style.
        </p>
        <button className='w-[180px] h-[50px] cursor-pointer bg-black text-white text-lg font-[satoshi-medium] rounded-4xl ml-44 mt-4'>
          Shop Now
        </button>
        <div className='flex flex-row mx-10 items-center'>
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
      
      {/* Right column - Image will show through */}
      <div className='flex flex-col relative z-50'>
        <img src ={star} alt="Star" className="w-[104px] h-[104px] mx-160 mt-40" />
        <img src ={star} alt="Star" className="w-[56px] h-[56px] mt-48" />
      </div>
    </div>
  )
}

export default Homepage