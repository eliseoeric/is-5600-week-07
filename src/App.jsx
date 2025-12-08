// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './state/CartProvider';
import Header from './components/Header';
import CardList from './components/CardList';
import SingleView from './components/SingleView';
import Cart from './components/Cart';
import Orders from './components/Orders'; // Make sure to import Orders
import './App.css';

function App() {
  return (
    <Router>
      <CartProvider>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<CardList />} />
            <Route path="/product/:id" element={<SingleView />} />
            <Route path="/cart" element={<Cart />} />
            {/* YOUR TASK 3: Add the /orders route */}
            <Route path="/orders" element={<Orders />} />
          </Routes>
        </div>
      </CartProvider>
    </Router>
  );
}

export default App;