import React, { useContext } from 'react';
import { CartContext } from '../state/CartProvider';

export default function AddToCart({ product }) {
  // Import the addToCart function from the CartContext
  const { addToCart } = useContext(CartContext);

  const handleClick = (product) => {
    console.log("Adding to cart", product);
    addToCart(product);
  }

  return (
    <a 
      className="f6 link dim br3 ba bw1 ph3 pv2 mb2 dib black pointer" 
      onClick={() => handleClick(product)}
    >
      Add to Cart
    </a>
  );
}