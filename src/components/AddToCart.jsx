// AddToCart.jsx

import React from "react";
import { useCart } from "../state/CartProvider";

const AddToCart = ({ product }) => {
  const { addToCart } = useCart();

  const handleClick = () => {
    addToCart(product);
  };

  return (
    <button
      className="f6 link dim br3 ba bw1 ph3 pv2 mb2 dib black"
      onClick={handleClick}
    >
      Add to Cart
    </button>
  );
};

export default AddToCart;
