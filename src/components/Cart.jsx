// src/components/Cart.jsx

import React from "react";
import PurchaseForm from "./PurchaseForm";
import { useCart } from "../state/CartProvider";

const Cart = () => {
  // ✅ Get cart values directly from context
  const { cartItems, removeFromCart, getCartTotal, updateItemQuantity } = useCart();

  return (
    <div className="center mw7 mv4">
      <div className="bg-white pa3 mb3">
        <h2 className="f2 mb2">Cart</h2>

        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <table className="w-100 ba pa2">
            <thead>
              <tr>
                <th className="tl pv2">Product</th>
                <th className="tr pv2">Quantity</th>
                <th className="tr pv2">Price</th>
                <th className="tr pv2">Action</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id || item._id}>
                  <td className="tl pv2">{item.name}</td>
                  <td className="tr pv2">
                    <button
                      className="pointer ba b--black-10 pv1 ph2 mr2"
                      onClick={() =>
                        updateItemQuantity(item.id || item._id, item.quantity - 1)
                      }
                    >
                      -
                    </button>
                    {item.quantity}
                    <button
                      className="pointer ba b--black-10 pv1 ph2 ml2"
                      onClick={() =>
                        updateItemQuantity(item.id || item._id, item.quantity + 1)
                      }
                    >
                      +
                    </button>
                  </td>
                  <td className="tr pv2">${(item.price * item.quantity).toFixed(2)}</td>
                  <td className="tr pv2">
                    <button
                      className="pointer ba b--black-10 pv1 ph2"
                      onClick={() => removeFromCart(item.id || item._id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <div className="tr f4 mv3">
          Total: ${getCartTotal().toFixed(2)}
        </div>
      </div>

      <div className="flex justify-end pa3 mb3">
        <PurchaseForm />
      </div>
    </div>
  );
};

export default Cart;
