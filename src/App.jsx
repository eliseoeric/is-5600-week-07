import React from 'react'
import { Route, Routes } from 'react-router-dom';

import Header from './components/Header';
import CardList from './components/CardList';
import SingleView from './components/SingleView';
import Cart from './components/Cart';   // Added
import Orders from './components/Orders'; // Added
import { CartProvider } from './state/CartProvider'; // Added

function App() {
  
  return (
    <div className="App">
      {/* 1. Wrap the app in CartProvider so Header and Routes can access cart state */}
      <CartProvider>
        <Header />
        
        <Routes>
          {/* 2. Remove the 'data' prop from these components as they now fetch from the API */}
          <Route path="/" element={<CardList />} />
          <Route path="/product/:id" element={<SingleView />} />
          
          {/* 3. Add the new routes for Cart and Orders */}
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </CartProvider>
    </div>
  );
}

export default App;