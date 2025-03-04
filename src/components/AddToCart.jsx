import React, { useContext } from 'react';
import { useCart } from '../state/CartProvider'; // Corrected import

export default function OrderButton({ product }) {
  // Use the correct hook to access the cart context
  const { addToCart } = useCart();

  const handleClick = (product) => {
    console.log("Adding to cart", product);
    addToCart(product);
  };

  return (
    <button
      className="f6 link dim br3 ba bw1 ph3 pv2 mb2 dib black"
      onClick={() => handleClick(product)}
    >
      Add to Cart
    </button>
  );
}