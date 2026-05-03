import React from 'react'
import { Route, Routes } from 'react-router-dom';

import Header from './components/Header';
import CardList from './components/CardList';
import SingleView from './components/SingleView';
import Cart from './components/Cart'; // Import the Cart component
import Orders from './components/Orders'; // Import the Orders component
import { CartProvider } from './state/CartProvider'; // Import the Provider

function App() {
  return (
    <div className="App">
      {/* 1. Wrap the app in CartProvider so all components can access the cart */}
      <CartProvider>
        <Header />
        
        <Routes>
          {/* 2. Remove the data={productData} props; components will fetch their own data now */}
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