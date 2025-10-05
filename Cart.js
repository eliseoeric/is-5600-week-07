import React from "react";
import { useCart } from "../state/CartProvider";

export default function Cart() {
  const { cartItems, updateItemQuantity, getCartTotal, removeFromCart } =
    useCart();

  if (cartItems.length === 0)
    return <div className="pa4">Your cart is empty.</div>;

  return (
    <div className="pa4">
      <h2>Your Cart</h2>
      {cartItems.map((item) => (
        <div key={item.id} className="mb3">
          <h3>{item.name}</h3>
          <p>${item.price}</p>
          <input
            type="number"
            min="1"
            value={item.quantity}
            onChange={(e) => updateItemQuantity(item.id, parseInt(e.target.value))}
          />
          <button onClick={() => removeFromCart(item.id)}>Remove</button>
        </div>
      ))}
      <h3>Total: ${getCartTotal().toFixed(2)}</h3>
    </div>
  );
}
