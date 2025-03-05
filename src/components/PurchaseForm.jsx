// src/components/PurchaseForm.js
import React, { useContext } from 'react';
import { CartContext } from '../state/CartProvider';

const PurchaseForm = () => {
  const { cart } = useContext(CartContext);

  return (
    <div>
      <h1>Purchase Form</h1>
      <ul>
        {cart.map(item => (
          <li key={item.id}>
            {/* Using the image URL you provided */}
            <img src="https://c8.alamy.com/comp/2RYHR2K/pink-retro-flip-phone-cartoon-drawing-simple-and-cute-hand-drawn-vector-illustration-y2k-aesthetic-nostalgia-doodle-2RYHR2K.jpg" alt={item.name} width="50" height="50" />
            <p>{item.name} - ${item.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PurchaseForm;
