@@ -0,0 +1,12 @@
import React, { useContext } from "react";
import { CartContext } from "../context/CartContext.jsx";

export default function AddToCart({ product }) {
  const { addToCart } = useContext(CartContext);

  return (
    <button onClick={() => addToCart(product)}>
      Add to Cart
    </button>
  );
}