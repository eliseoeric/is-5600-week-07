import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Header from './components/Header';
import CardList from './components/CardList';
import SingleView from './components/SingleView';
import Cart from './components/Cart';
import Orders from './components/Orders';

import productData from './data/full-products';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<CardList data={productData} />} />
        <Route path="/product/:id" element={<SingleView data={productData} />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<Orders />} />
      </Routes>
    </div>
  );
}

export default App;
