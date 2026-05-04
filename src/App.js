import React, { useEffect, useState } from "react";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import Orders from "./components/Orders";

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <div>
      <h1>Print Shop</h1>
      <ProductList products={products} />
      <Cart />
      <Orders />
    </div>
  );
}

export default App;