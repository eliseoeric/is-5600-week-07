import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { CartProvider } from './state/CartProvider';

import Header from './components/Header';
import CardList from './components/CardList';
import SingleView from './components/SingleView';

function App() {
  return (
    <CartProvider>
      <Header />
      <Routes>
        <Route path="/" element={<CardList />} />
        <Route path="/product/:id" element={<SingleView />} />
      </Routes>
    </CartProvider>
  );
}

export default App;
