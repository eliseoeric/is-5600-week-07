// src/components/SingleView.jsx
import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../state/CartProvider";

export default function SingleView() {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);

  // Dummy product for demo
  const product = { id, name: `Product ${id}` };

  return (
    <div>
      <h2>Product Details</h2>
      <p>ID: {product.id}</p>
      <p>Name: {product.name}</p>
      <button onClick={() => addToCart(product)}>Add to Cart</button>
    </div>
  );
}
