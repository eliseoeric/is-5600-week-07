import React from "react";
import { useCart } from "../state/CartProvider";

export default function AddToCart({ product }) {
  const { addToCart } = useCart();

  const handleClick = () => {
    if (!product || !product._id || !product.price) {
      console.error("Invalid product data:", product);
      return;
    }

    const productWithDetails = {
      _id: product._id,
      name: product.name || product.title || product.description || "Unknown Product", // ✅ Ensure a valid name
      price: product.price,
      quantity: 1,
    };

    console.log("Adding to cart", productWithDetails);
    addToCart(productWithDetails);
  };

  return (
    <button className="f6 link dim br3 ba bw1 ph3 pv2 mb2 dib black" onClick={handleClick}>
      Add to Cart
    </button>
  );
}