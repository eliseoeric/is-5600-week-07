import React, { useContext } from 'react';
import { CartContext } from '../state/CartProvider';

const AddToCart = ({ product }) => {
  const { addToCart } = useContext(CartContext);

  const handleClick = () => {
    if (!product) {
      console.error("Error: No product provided to AddToCart component");
      return;
    }
    
    console.log("Adding to cart:", product);
    addToCart(product);
  };

  return (
    <button
      className="f6 link dim br3 ba bw1 ph3 pv2 mb2 dib black bg-light-gray hover-bg-black hover-white"
      onClick={handleClick}
      disabled={!product} // Disable button if product is undefined
    >
      Add to Cart
    </button>
  );
};

export default AddToCart;
