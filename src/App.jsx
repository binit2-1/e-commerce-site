import React from 'react'
import { Route, Routes } from 'react-router-dom'

import Homepage from './pages/Homepage'
import CategoryPage from './pages/CategoryPage'
import ProductDetailPage from './pages/ProductDetailPage'
import TopSignIn from './components/TopSignIn'
import Navbar from './components/Navbar'

const App = () => {
  return (
    <div className='w-screen h-screen bg-[#F2F0F1]'>
      <TopSignIn />
      <Navbar />
      <div className="relative z-0">
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