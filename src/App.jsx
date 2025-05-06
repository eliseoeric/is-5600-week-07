import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Header from './components/Header';
import CardList from './components/CardList';
import SingleView from './components/SingleView';
import Orders from './components/Orders';

import productData from './data/full-products';
import { CartProvider } from './context/CartContext';

function App() {
  return (
    <CartProvider>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<CardList data={productData} />} />
          <Route path="/product/:id" element={<SingleView data={productData} />} />
          <Route path="/orders" element={<Orders />} /> {/* ✅ Added this line */}
        </Routes>
      </div>
    </CartProvider>
  );
}

export default App;
