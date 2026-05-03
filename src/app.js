import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import CardList from "./components/CardList";
import SingleView from "./components/SingleView";
import Cart from "./components/Cart";
import Orders from "./components/Orders";
import Header from "./components/Header";
import { CartProvider } from "./state/CartProvider";

function App() {
  return (
    <Router>
      <CartProvider>
        <Header />
        <Routes>
          <Route path="/" element={<CardList />} />
          <Route path="/product/:id" element={<SingleView />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </CartProvider>
    </Router>
  );
}

export default App;