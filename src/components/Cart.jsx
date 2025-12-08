import React, { useContext } from "react";
import { CartContext } from "../state/CartProvider";

export default function Cart() {
  const {
    cartItems,
    updateItemQuantity,
    removeFromCart,
    getCartTotal,
  } = useContext(CartContext);

  return (
    <div className="pa4">
      <h2>Your Cart</h2>

      {cartItems.length === 0 && <p>No items yet.</p>}

      {cartItems.map((item) => (
        <div key={item.id} className="pa3 ba mv2">
          <h3>{item.title}</h3>

          <input
            type="number"
            value={item.quantity}
            min="1"
            onChange={(e) =>
              updateItemQuantity(item.id, Number(e.target.value))
            }
          />

          <button onClick={() => removeFromCart(item.id)}>Remove</button>
        </div>
      ))}

      <h3>Total: ${getCartTotal()}</h3>
    </div>
  );
}
