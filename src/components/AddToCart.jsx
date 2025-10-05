// src/components/AddToCart.jsx
import React, { useContext } from "react";
import { CartContext } from "../state/CartProvider";

export default function AddToCart({ product }) {
  const { addToCart } = useContext(CartContext);

  const handleClick = () => {
    console.log("Adding to cart", product);
    addToCart(product);
  };

  return (
    <button
      onClick={handleClick}
      style={{
        padding: "10px 20px",
        backgroundColor: "#2196F3",
        color: "white",
        border: "none",
        borderRadius: "5px",
      }}
    >
      Add to Cart
    </button>
  );
}
