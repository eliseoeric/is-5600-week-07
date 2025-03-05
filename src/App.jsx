import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CardList from "./components/CardList.jsx";
import Orders from "./components/Orders.jsx";
import PurchaseForm from "./components/PurchaseForm.jsx";
import Search from "./components/Search.jsx";
import SingleView from "./components/SingleView.jsx";
import Header from "./components/Header.jsx";
import Cart from "./components/Cart.jsx";

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<CardList />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/purchase" element={<PurchaseForm />} />
        <Route path="/search" element={<Search />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product/:id" element={<SingleView />} />
      </Routes>
    </Router>
  );
};

export default App;
