// Cart.jsx

import React from "react";
import { useCart } from "../state/CartProvider";

const Cart = () => {
  const { cartItems, updateItemQuantity, removeFromCart, getCartTotal } = useCart();

  const handleQtyChange = (id, e) => {
    const q = parseInt(e.target.value, 10);
    if (q > 0) {
      updateItemQuantity(id, q);
    }
  };

  return (
    <div className="pa4">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        cartItems.map((item) => (
          <div key={item.id} className="flex items-center justify-between mv3">
            <div>
              <p>{item.name}</p>
              <p>${item.price} each</p>
            </div>
            <div>
              <input
                type="number"
                value={item.quantity}
                min="1"
                onChange={(e) => handleQtyChange(item.id, e)}
                className="mr3"
              />
              <button onClick={() => removeFromCart(item.id)}>
                Remove
              </button>
            </div>
          </div>
        ))
      )}

      <h3>Total: ${getCartTotal()}</h3>
    </div>
  );
};

export default Cart;
