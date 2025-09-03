import React from 'react'
import magnifyingGlass from '../assets/imgs/magnifyingGlass.svg'
import cart from '../assets/imgs/cart.svg'
import pfp from '../assets/imgs/pfp.svg'
import dropdown from '../assets/imgs/dropdown.svg'
import hamburger from '../assets/imgs/hamburger.svg'

const Navbar = () => {
  return (
    <div className='absolute w-full h-[70px] bg-white top-[40px] px-5 xl:px-6 2xl:px-20'>
      <div className="flex justify-between lg:justify-center lg:px-20 xl:justify-around 2xl:justify-around h-full w-full items-center flex-row gap-5">
        <div className="flex items-center gap-4 lg:hidden xl:hidden 2xl:hidden">
          <img src={hamburger} alt="Menu" />
          <div className='font-[neue-montreal-bold] text-2xl'>SHOP CO</div>
        </div>

        <div className='hidden lg:block xl:block 2xl:block font-[neue-montreal-bold] lg:text-xl xl:text-2xl 2xl:text-3xl'>SHOP CO</div>

        <div className='hidden lg:flex xl:flex 2xl:flex gap-3 lg:gap-4 xl:gap-5 2xl:gap-4'>
          <div className='font-[satoshi-medium] lg:text-[12px] xl:text-[13px] 2xl:text-[15px]'>Shop<img src={dropdown} alt="dropdown" className='inline-block ml-1' /></div>
          <div className='font-[satoshi-medium] lg:text-[12px] xl:text-[13px] 2xl:text-[15px]'>On Sale</div>
          <div className='font-[satoshi-medium] lg:text-[12px] xl:text-[13px] 2xl:text-[15px]'>New Arrivals</div>
          <div className='font-[satoshi-medium] lg:text-[12px] xl:text-[13px] 2xl:text-[15px]'>Brands</div>
        </div>
        
        <div className='hidden lg:block xl:block 2xl:block relative lg:w-[250px] xl:w-[320px] 2xl:w-[450px]'>
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
        <div className="flex flex-row gap-3 lg:gap-2 xl:gap-3 2xl:gap-4">
          <img src={magnifyingGlass} alt="Search" className='lg:hidden xl:hidden 2xl:hidden w-5 h-5' />
          <img src={cart} alt="cart" />
          <img src={pfp} alt="pfp" />
        </div>
      </div>
    </div>
  )
}

export default Navbar