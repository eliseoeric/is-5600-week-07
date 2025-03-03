import React, { useContext } from 'react';
import { CartContext } from '../state/CartProvider';

const Cart = () => {
  const { cartItems, removeFromCart, updateItemQuantity, getCartTotal } = useContext(CartContext);

  return (
    <div>
      <h2>Cart</h2>
      <ul>
        {cartItems.map(item => (
          <li key={item.id}>
            {item.description} - ${item.price} x {item.quantity}
            <button onClick={() => updateItemQuantity(item.id, -1)}>-</button>
            <button onClick={() => updateItemQuantity(item.id, 1)}>+</button>
            <button onClick={() => removeFromCart(item)}>Remove</button>
          </li>
        ))}
      </ul>
      <h3>Total: ${getCartTotal()}</h3>
    </div>
  );
};

export default Cart;