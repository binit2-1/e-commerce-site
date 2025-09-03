import React from 'react'
import magnifyingGlass from '../assets/imgs/magnifyingGlass.svg'
import cart from '../assets/imgs/cart.svg'
import pfp from '../assets/imgs/pfp.svg'
import dropdown from '../assets/imgs/dropdown.svg'

const Navbar = () => {
  return (
    <div className='absolute w-full h-[70px] bg-white top-[40px] px-60'>
      <div className="flex justify-around h-full w-full items-center flex-row gap-5">
        <div className='font-[neue-montreal-bold] text-4xl'>SHOP CO</div>
        <div className='font-[satoshi-medium] text-[16px]'>Shop<img src={dropdown} alt="dropdown" className='inline-block ml-1' /></div>
        <div className='font-[satoshi-medium] text-[16px]'>On Sale</div>
        <div className='font-[satoshi-medium] text-[16px]'>New Arrivals</div>
        <div className='font-[satoshi-medium] text-[16px]'>Brands</div>
        <div className='relative w-[577px]'>
          <img 
            src={magnifyingGlass} 
            alt="Search" 
            className='absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5'
          />
          <input 
            type='search' 
            className='border bg-[#f0f0f0] border-none font-[satoshi-regular] rounded-4xl pl-12 py-3 w-full' 
            placeholder='Search for Products...' 
          />
        </div>
        <div className="flex flex-row gap-5">
            <img src={cart} alt="cart" />
            <img src={pfp} alt="pfp" />
        </div>
      </div>
    </div>
  )
}

export default Navbar