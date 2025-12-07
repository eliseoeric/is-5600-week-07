import React, { useContext } from "react";
import { CartContext } from "../state/CartProvider";

export default function AddToCart({ product }) {
  const { addToCart } = useContext(CartContext);

  return (
    <button onClick={() => addToCart(product)}>
      Add to Cart
    </button>
  );
}
