import React from 'react'
import { Route, Routes} from 'react-router-dom';

// App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import CardList from './components/CardList';
import SingleView from './components/SingleView';
import productData from './data/full-products';

import Cart from './components/Cart';
import Orders from './components/Orders';  // Import Orders component
import { CartProvider } from './state/CartProvider';

function App() {


  return (
    <div className="App">
      <Header />



      <CartProvider>
        <Header />
        <Routes>
          <Route path="/" element={<CardList data={productData} />} />
          <Route path="/product/:id" element={<SingleView data={productData} />} />
          {/* Route for displaying all products */}
          <Route path="/" element={<CardList />} />

          {/* Route for a single product's details */}
          <Route path="/product/:id" element={<SingleView />} />

          {/* Route for the cart page */}
          <Route path="/cart" element={<Cart />} />

          {/* Route for displaying orders */}
          <Route path="/orders" element={<Orders />} />
        </Routes>



      </CartProvider>
    </div>
  );
}

export default App;