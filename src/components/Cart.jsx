import React, { useContext } from 'react';
import { CartContext } from '../state/CartProvider';

export default function Cart() {
  const { cartItems, updateItemQuantity, removeFromCart, getCartTotal } = useContext(CartContext);

  return (
    <div className="pa4">
      <h1>Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div key={item.id} className="mb3 pa3 ba">
              <p>{item.title} - ${item.price}</p>
              <input 
                type="number" 
                value={item.quantity}
                onChange={(e) => updateItemQuantity(item.id, parseInt(e.target.value))}
              />
              <button onClick={() => removeFromCart(item.id)}>Remove</button>
            </div>
          ))}
          <h2>Total: ${getCartTotal()}</h2>
        </>
      )}
    </div>
  );
}