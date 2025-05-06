import React, { useContext } from 'react';
import AppContext from './AppContext';

const Cart = () => {
  const { cart, submitOrder } = useContext(AppContext);
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div>
      <h2>Cart</h2>
      {cart.map((item) => (
        <div key={item.id}>
          <p>
            {item.name} x {item.quantity}: ${item.price * item.quantity}
          </p>
        </div>
      ))}
      <p>Total: ${total.toFixed(2)}</p>
      <button onClick={submitOrder}>Checkout</button>
    </div>
  );
};

export default Cart;