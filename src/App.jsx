// src/App.js
import React from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import CardList from "./components/CardList";
import SingleView from "./components/SingleView";
import Cart from "./components/Cart"; // Add Cart Component for displaying cart items
import { CartProvider } from "./state/CartProvider"; // Import the CartProvider

function App() {
  return (
    <div className="App">
      <CartProvider> {/* Wrap entire app with CartProvider */}
        <Header />
        <Routes>
          <Route path="/" element={<CardList />} />
          <Route path="/product/:id" element={<SingleView />} />
          <Route path="/cart" element={<Cart />} /> {/* Cart route */}
        </Routes>
      </CartProvider>
    </div>
  );
}

export default App;
