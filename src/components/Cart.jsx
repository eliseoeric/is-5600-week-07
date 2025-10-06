import React, { useContext } from "react";
import { CartContext } from "../state/CartProvider";

export default function Cart() {
  const { cartItems, updateItemQuantity, getCartTotal, removeFromCart } = useContext(CartContext);

  return (
    <div className="pa3">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div key={item.id} className="mb3">
              <h3>{item.name}</h3>
              <p>${item.price}</p>
              <p>Quantity: {item.quantity}</p>
              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) =>
                  updateItemQuantity(item.id, parseInt(e.target.value, 10))
                }
              />
              <button onClick={() => removeFromCart(item.id)}>Remove</button>
            </div>
          ))}
          <h3>Total: ${getCartTotal()}</h3>
        </div>
      )}
    </div>
  );
}

