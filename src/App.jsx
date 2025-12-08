import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Header from './components/Header';
import CardList from './components/CardList';
import SingleView from './components/SingleView';
import Cart from './components/Cart';
import productData from './data/full-products';

// ⬅️ import CartProvider from state
import { CartProvider } from './state/CartProvider';

function App() {
  return (
    <CartProvider>
      <div className="App">
        <Header />

        <Routes>
          <Route path="/" element={<CardList data={productData} />} />
          <Route
            path="/product/:id"
            element={<SingleView data={productData} />}
          />
          {/* ⬅️ cart route */}
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </div>
    </CartProvider>
  );
}

export default App;