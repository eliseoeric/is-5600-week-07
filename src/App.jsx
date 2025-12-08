import React from 'react'
import { Route, Routes} from 'react-router-dom';
// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import CardList from "./components/CardList";
import SingleView from "./components/SingleView";
import Cart from "./components/Cart";
import { CartProvider } from "./state/CartProvider";

import Header from './components/Header';
import CardList from './components/CardList';
import SingleView from './components/SingleView';
import productData from './data/full-products';


function App() {

export default function App() {
  return (
    <div className="App">
      <Header />

    <CartProvider>
      <Router>
        <Header />  {/* always show header */}
        <Routes>
          <Route path="/" element={<CardList data={productData} />} />
          <Route path="/product/:id" element={<SingleView data={productData} />} />
          <Route path="/" element={<CardList />} />
          <Route path="/product/:id" element={<SingleView />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>

    </div>
      </Router>
    </CartProvider>
  );
}

export default App;