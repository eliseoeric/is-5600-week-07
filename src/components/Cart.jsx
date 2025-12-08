import React, { useContext } from "react";
import { CartContext } from "../state/CartProvider";

const Cart = () => {
  const {
    cartItems,
    updateItemQuantity,
    removeFromCart,
    getCartTotal
  } = useContext(CartContext);

  return (
    <div className="pa4">
      <h2>Cart</h2>

      {cartItems.map(item => (
        <div key={item._id}>
          <p>{item.description}</p>

          <input
            type="number"
            value={item.quantity}
            onChange={(e) =>
              updateItemQuantity(item._id, Number(e.target.value))
            }
          />

          <button onClick={() => removeFromCart(item._id)}>
            Remove
          </button>
        </div>
      ))}

      <h3>Total: ${getCartTotal()}</h3>
    </div>
  );
};

export default Cart;
