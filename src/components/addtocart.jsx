// src/components/AddToCart.jsx
import React, { useContext } from "react";
import { CartContext } from "../state/CartProvider"; // Adjust path if needed

const AddToCart = ({ product }) => {
  const { addToCart } = useContext(CartContext);

  const handleClick = () => {
    addToCart(product);
  };

  return (
    <button onClick={handleClick} className="add-to-cart-btn">
      Add to Cart
    </button>
  );
};

export default AddToCart;
