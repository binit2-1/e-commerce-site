import React from 'react'

const Homepage = () => {
  return (
    <div className='w-screen h-screen bg-[#F2F0F1]'>
        <div className='absolute top-0 w-full h-[38px] bg-black'>
            <div className='flex justify-center items-center text-[12px] lg:text-[14px] text-white w-full h-[38px] font-[satoshi-regular]'>
                Sign up and get 20% off to your first order.&nbsp; <a className='underline font-[satoshi-medium]' href='#'>Sign Up Now</a>
            </div>
        </div>
    </div>
  )
}

export default Homepage