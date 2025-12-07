import React, { useContext } from "react";
import { CartContext } from "../state/CartProvider";

export default function AddToCart({ product }) {
  const { addToCart } = useContext(CartContext);

  const handleClick = () => {
    console.log("Adding to cart:", product);
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
}
