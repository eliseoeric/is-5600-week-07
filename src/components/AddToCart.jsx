import React from "react";
import { useCart } from "../state/CartProvider";

const AddToCart = ({ product }) => {
  const { add } = useCart();

  return (
    <button className="ba br2 ph3 pv2 pointer" onClick={() => add(product)}>
      Add to Cart
    </button>
  );
};

export default AddToCart;