import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import Header from './components/Header';
import CardList from './components/CardList';
import SingleView from './components/SingleView';
import Orders from './components/Orders';
import Cart from './components/Cart';
import { CartProvider } from './state/CartProvider';
import { BASE_URL } from './config';

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}/products`)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <CartProvider>
      <div className="App">
        <Header />

        <Routes>
          <Route path="/" element={<CardList data={products} />} />
          <Route path="/product/:id" element={<SingleView data={products} />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </div>
    </CartProvider>
  );
}

export default App;