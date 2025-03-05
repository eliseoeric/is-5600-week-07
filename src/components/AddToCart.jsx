import React, { useContext } from 'react';
import { CartContext } from '../state/CartProvider';

const AddToCart = ({ product }) => {
  const { addToCart } = useContext(CartContext);

  return (
    <button className="btn" onClick={() => addToCart(product)}>
      Add to Cart
    </button>
  );
};

export default AddToCart;