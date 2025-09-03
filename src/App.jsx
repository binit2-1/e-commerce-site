import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Homepage from './pages/Homepage'
import CategoryPage from './pages/CategoryPage'
import ProductDetailPage from './pages/ProductDetailPage'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Homepage />} />
      <Route path='/category' element={<CategoryPage />} />
      <Route path='/product' element={<ProductDetailPage />} />
    </Routes>
  )
}

export default App