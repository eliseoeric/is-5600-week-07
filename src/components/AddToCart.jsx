import React from 'react';
import { useCart } from '../state/CartProvider';  

export default function OrderButton({ product }) {
  const { addToCart } = useCart();  

  const handleClick = () => {
    console.log("Adding to cart", product);
    addToCart(product);
  };

  return (
    <button className="f6 link dim br3 ba bw1 ph3 pv2 mb2 dib black" onClick={handleClick}>
      Add to Cart
    </button>
  );
}