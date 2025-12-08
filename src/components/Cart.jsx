import React from "react";
import { useCart } from "../state/CartProvider";

export default function Cart() {
  const {
    cartItems,
    updateItemQuantity,
    removeFromCart,
    getCartTotal
  } = useCart();

  // Handle quantity change
  const handleQuantityChange = (id, value) => {
    const quantity = Number(value);
    if (quantity >= 1) {
      updateItemQuantity(id, quantity);
    }
  };

  // If cart is empty
  if (cartItems.length === 0) {
    return <h2 className="pa4">Your cart is empty.</h2>;
  }

  return (
    <div className="pa4">
      <h2>Your Cart</h2>

      {cartItems.map((item) => (
        <div key={item.id} className="ba pa3 mv3">
          <h3>{item.title}</h3>
          <p>Price: ${item.price}</p>

          {/* Quantity Input */}
          <input
            type="number"
            min="1"
            value={item.quantity}
            onChange={(e) =>
              handleQuantityChange(item.id, e.target.value)
            }
            className="pa2 ba br2 w3"
          />

          {/* Remove Button */}
          <button
            className="ml3 f6 link dim br2 ba bw1 ph3 pv2 dib red"
            onClick={() => removeFromCart(item.id)}
          >
            Remove
          </button>
        </div>
      ))}

      {/* TOTAL PRICE */}
      <h3>Total: ${getCartTotal()}</h3>

      {/* PLACE ORDER BUTTON */}
      <button
        className="mt3 f5 link dim br3 ba bw1 ph3 pv2 dib dark-green"
        onClick={() => alert("Order submitted! (Lab simulation)")}
      >
        Place Order
      </button>
    </div>
  );
}
