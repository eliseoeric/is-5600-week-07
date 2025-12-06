// src/components/CardList.jsx
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../state/CartProvider";

export default function CardList() {
  const { addToCart } = useContext(CartContext);

  const products = [
    { id: 1, name: "Product A" },
    { id: 2, name: "Product B" },
  ];

  return (
    <div>
      <h2>Products</h2>
      {products.map((product) => (
        <div key={product.id}>
          <Link to={`/product/${product.id}`}>{product.name}</Link>
          <button onClick={() => addToCart(product)}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
}
