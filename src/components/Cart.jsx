// components/Cart.jsx
import React, { useContext } from 'react';
import { CartContext } from '../state/CartProvider';

function Cart() {
  const { cart, addToCart } = useContext(CartContext);

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cart.map((item, index) => (
            <li key={index}>{item.name} - ${item.price}</li>
          ))}
        </ul>
      )}
      <button onClick={addToCart}>Checkout</button>
    </div>
  );
}

export default Cart;
