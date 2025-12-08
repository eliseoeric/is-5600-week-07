// src/components/AddToCart.jsx
import React from "react";
import { useCart } from "../state/CartProvider";

export default function AddToCart({ product }) {
  const { addToCart } = useCart();

  const handleClick = () => {
    addToCart(product);
  };

  return (
    <button onClick={handleClick} style={{ padding: "8px 12px", borderRadius: 6 }}>
      Add to Cart
    </button>
  );
}
