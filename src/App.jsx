import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import CardList from "./components/CardList";
import SingleView from "./components/SingleView";
import Cart from "./components/Cart";
import Orders from "./components/Orders";
import productsData from "./data/full-products.json"; // or products.json, if that's the starter file

function App() {
  return (
    <div className="sans-serif">
      <Header />

      <main className="pa4">
        <Routes>
          <Route path="/" element={<CardList data={productsData} />} />
          <Route path="/product/:id" element={<SingleView />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
