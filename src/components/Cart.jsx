// Cart.js
import React from 'react';
import { useCart } from '../state/CartProvider';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { state, removeFromCart, getCartTotal, updateItemQuantity } = useCart();

  return (
    <div>
      <h1>Your Cart</h1>
      {state.cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          {state.cartItems.map((item) => (
            <div key={item.id}>
              <h3>{item.name}</h3>
              <p>Price: ${item.price}</p>
              <p>Quantity: 
                <input 
                  type="number" 
                  value={item.quantity} 
                  onChange={(e) => updateItemQuantity(item.id, parseInt(e.target.value))} 
                />
              </p>
              <button onClick={() => removeFromCart(item)}>Remove</button>
            </div>
          ))}
          <h2>Total: ${getCartTotal()}</h2>
        </div>
      )}
      <Link to="/">Continue Shopping</Link>
    </div>
  );
};

export default Cart;
