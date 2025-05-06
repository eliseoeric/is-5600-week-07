import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import ProductList from "./components/CardList";
import DetailPage from "./components/SingleView";
import CartPage from "./components/Cart";
import OrderPage from "./components/Orders";
import { CartProvider } from "./state/CartProvider";

function App() {
  return (
    <CartProvider>
      <Header />
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/product/:id" element={<DetailPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/orders" element={<OrderPage />} />
      </Routes>
    </CartProvider>
  );
}

export default App;
