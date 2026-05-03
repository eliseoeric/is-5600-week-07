import React from 'react'
import { Route, Routes } from 'react-router-dom';

import Header from './components/Header';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import Orders from './components/Orders';
import SingleView from './components/SingleView';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/product/:id" element={<SingleView />} />
      </Routes>
    </div>
  );
}

export default App;
