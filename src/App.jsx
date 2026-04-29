import React from "react";
import { Routes, Route } from "react-router-dom";
import CardList from "./components/CardList";
import SingleView from "./components/SingleView";
import Header from "./components/Header";
import Cart from "./components/Cart";
import Orders from "./components/Orders";
import { CartProvider } from "./state/CartProvider";

function App() {
  return (
    <CartProvider>
      <Header />
      <Routes>
        <Route path="/" element={<CardList />} />
        <Route path="/products" element={<CardList />} />
        <Route path="/product/:id" element={<SingleView />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<Orders />} />
      </Routes>
    </CartProvider>
  );
}

export default App;