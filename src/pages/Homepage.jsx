import React from 'react'

const Homepage = () => {
  return (
    <div className='w-full min-h-screen grid grid-cols-2 pt-[108px]'>
      <div className='flex flex-col'>
        <h1 className='text-6xl text-black px-40 pt-20 m-4 font-[neue-montreal-bold]'>FIND CLOTHES <br /> THAT MATCHES <br/> YOUR STYLE</h1>
        <p className='text-lg text-gray-700 px-40 m-4 font-[satoshi-light]'>Browse through our diverse range of meticulously crafted garments, designed <br/> to bring out your individuality and cater to your sense of style.</p>
        <button className='w-[180px] h-[50px] cursor-pointer bg-black text-white text-lg font-[satoshi-medium] rounded-4xl ml-44 mt-4'>Shop Now</button>
      </div>
    </div>
  )
}

export default Homepage