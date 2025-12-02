import React, { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom';

import Header from './components/Header';
import CardList from './components/CardList';
import SingleView from './components/SingleView';
import { BASE_URL } from './config';

function App() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${BASE_URL}/products`)
        const data = await res.json()
        setProducts(data)
      } catch (err) {
        console.error('Error fetching products', err)
      }
    }
    fetchProducts()
  }, [])

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<CardList data={products} />} />
        <Route path="/product/:id" element={<SingleView data={products} />} />
      </Routes>
    </div>
  );
}

export default App;
