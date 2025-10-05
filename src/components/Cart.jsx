// src/components/Cart.js
import React from "react";
import { useCart } from "../state/CartProvider";

export default function Cart() {
  const { cartItems, updateItemQuantity, removeFromCart, getCartTotal } =
    useCart();

  return (
    <div style={{ padding: "30px" }}>
      <h2>Your Cart</h2>
      {cartItems.length === 0 && <p>Cart is empty.</p>}
      {cartItems.map((item) => (
        <div
          key={item.id}
          style={{
            borderBottom: "1px solid #ccc",
            marginBottom: "10px",
            paddingBottom: "10px",
          }}
        >
          <h3>{item.name}</h3>
          <p>${item.price}</p>
          <input
            type="number"
            value={item.quantity}
            onChange={(e) =>
              updateItemQuantity(item.id, parseInt(e.target.value))
            }
          />
          <button
            style={{ marginLeft: "10px" }}
            onClick={() => removeFromCart(item.id)}
          >
            Remove
          </button>
        </div>
      ))}
      <h3>Total: ${getCartTotal()}</h3>
    </div>
  );
}
