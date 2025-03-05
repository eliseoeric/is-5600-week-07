import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { CartProvider } from './state/CartProvider';

import Header from './components/Header';
import CardList from './components/CardList';
import SingleView from './components/SingleView';

function App() {
  return (
    <div className="App">
      <CartProvider>
        <Header />
        <Routes>
          <Route path="/" element={<CardList />} />
          <Route path="/product/:id" element={<SingleView />} />
        </Routes>
      </CartProvider>
    </div>
  );
}

export default App;
