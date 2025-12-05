import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import Header from "./components/Header";
import CardList from "./components/CardList";
import SingleView from "./components/SingleView";
import { CartProvider } from "./state/CartProvider";

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  return (
    <CartProvider>
      <div className="App">
        <Header />

        <Routes>
          <Route path="/" element={<CardList data={products} />} />
          <Route path="/product/:id" element={<SingleView data={products} />} />
        </Routes>
      </div>
    </CartProvider>
  );
}

export default App;
