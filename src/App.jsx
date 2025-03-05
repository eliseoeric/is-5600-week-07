import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import Header from './components/Header';
import CardList from './components/CardList';
import SingleView from './components/SingleView';
import { CartProvider } from './state/CartProvider';

import { BASE_URL } from './config';

function App() {
  const [products, setProducts] = useState([]);

  // Fetch products from the Node API
  const fetchProducts = async () => {
    const response = await fetch(`${BASE_URL}/products`);
    const data = await response.json();
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="App">
      <CartProvider>
        <Header />
        <Routes>
          <Route path="/" element={<CardList products={products} />} />
          <Route path="/product/:id" element={<SingleView />} />
        </Routes>
      </CartProvider>
    </div>
  );
}

export default App;
