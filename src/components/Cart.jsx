import React from "react";
import { useCart } from "../state/CartProvider";

export default function Cart() {
  const { cart, removeFromCart, updateItemQuantity, getCartTotal } = useCart();

  if (cart.length === 0) {
    return <h2 className="pa4">Your cart is empty</h2>;
  }

  return (
    <div className="pa4">
      <h2>Shopping Cart</h2>

      {cart.map((item) => (
        <div key={item._id} className="pa3 ba mb2">
          <img src={item.urls.small} width="150" alt="" />

          <h3>{item.description ?? item.alt_description}</h3>
          <p>${item.price}</p>

          <input
            type="number"
            value={item.quantity}
            min="1"
            onChange={(e) =>
              updateItemQuantity(item._id, e.target.value)
            }
          />

          <button
            className="ml2"
            onClick={() => removeFromCart(item._id)}
          >
            Remove
          </button>
        </div>
      ))}

      <h3>Total: ${getCartTotal()}</h3>
    </div>
  );
}