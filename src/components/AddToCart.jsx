import React from "react";
import { useCart } from "../state/CartProvider";

export default function AddToCart({ product }) {
  const { addToCart } = useCart();

  return (
    <button
      className="f6 link dim br3 ba ph3 pv2 mb2 dib black"
      onClick={() => addToCart(product)}
    >
      Add to Cart
    </button>
  );
}
