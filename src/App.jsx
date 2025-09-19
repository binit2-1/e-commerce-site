import React from 'react'
import { Route, Routes } from 'react-router-dom'

import Homepage from './pages/Homepage'
import CategoryPage from './pages/CategoryPage'
import ProductDetailPage from './pages/ProductDetailPage'
import TopSignIn from './components/TopSignIn'
import Navbar from './components/Navbar'
import backgroundImage from './assets/imgs/landingImage.png'
import CompanyBar from './components/CompanyBar'

const App = () => {
  return (
    <div className='w-screen h-screen relative overflow-x-auto' >
      <img src={backgroundImage} className="hidden lg:block absolute top-[120px] left-0 w-screen h-screen object-cover z-0" />
      <div className='lg:hidden w-screen h-screen absolute top-0 left-0 bg-[#f2f0f1] z-0'></div>
      <img 
        src={backgroundImage} 
        className="lg:hidden block absolute top-[550px] -left-132.5 min-w-[1000px] h-auto z-0 " 
      />
      <TopSignIn />
      <Navbar />
      <CompanyBar />
      <div className="relative z-20">
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/category' element={<CategoryPage />} />
          <Route path='/product' element={<ProductDetailPage />} />
        </Routes>
      </div>
    </div>
  )
}

export default App