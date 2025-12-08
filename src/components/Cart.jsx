import React from "react";
import { useCart } from "../state/CartProvider";

export default function Cart() {
  const { cartItems, updateItemQuantity, removeFromCart, getCartTotal } =
    useCart();

  return (
    <div className="center mw7 mv4">
      <div className="bg-white pa3 mb3">
        <h2 className="f2 mb2">Cart</h2>

        <table className="w-100 ba pa2">
          <thead>
            <tr>
              <th className="tl pv2">Product</th>
              <th className="tr pv2">Qty</th>
              <th className="tr pv2">Price</th>
              <th className="tr pv2">Action</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item._id}>
                <td>{item.description}</td>
                <td>
                  <button onClick={() => updateItemQuantity(item._id, -1)}>
                    -
                  </button>
                  {item.quantity}
                  <button onClick={() => updateItemQuantity(item._id, +1)}>
                    +
                  </button>
                </td>
                <td>${item.price * item.quantity}</td>
                <td>
                  <button onClick={() => removeFromCart(item)}>Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <h3>Total: ${getCartTotal().toFixed(2)}</h3>
      </div>
    </div>
  );
}