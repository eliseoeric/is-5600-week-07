// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./state/CartProvider";

import Header from "./components/Header";
import CardList from "./components/CardList";
import SingleView from "./components/SingleView";
import Cart from "./components/Cart";
import Orders from "./components/Orders";

export default function App() {
  return (
    <CartProvider>
      <Router>
        <Header />
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: 12 }}>
          <Routes>
            <Route path="/" element={<CardList />} />
            <Route path="/product/:id" element={<SingleView />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/orders" element={<Orders />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}
