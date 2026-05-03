import React from 'react'
import { Route, Routes } from 'react-router-dom'

import Header from './components/Header'
import ProductList from './components/ProductList'
import SingleView from './components/SingleView'
import Cart from './components/Cart'
import Orders from './components/Orders'

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/product/:id" element={<SingleView />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<Orders />} />
      </Routes>
    </div>
  )
}

export default App;
