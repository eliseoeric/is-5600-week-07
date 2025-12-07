import React from "react";
import { useCart } from "../state/CartProvider";

export default function Cart() {
  const {
    cartItems,
    updateItemQuantity,
    removeFromCart,
    getCartTotal,
  } = useCart();

  return (
    <div className="pa4">
      <h2>Your Cart</h2>

      {cartItems.length === 0 && <p>Your cart is empty.</p>}

      {cartItems.map((item) => (
        <div key={item.id} className="ba br2 pa3 ma2">
          <h3>{item.description}</h3>

          <div>
            Quantity:
            <input
              type="number"
              value={item.quantity}
              min="1"
              onChange={(e) =>
                updateItemQuantity(item.id, Number(e.target.value))
              }
            />
          </div>

          <button
            className="mt2"
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
