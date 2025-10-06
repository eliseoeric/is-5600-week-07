import React from "react";
import PurchaseForm from "./PurchaseForm";
import { useCart } from "../state/CartProvider";
import { Link } from "react-router-dom";

export default function Cart() {
  const { cartItems, removeFromCart, updateItemQuantity, getCartTotal } = useCart();

  if (!cartItems.length) {
    return (
      <div className="center mw7 mv4 tc">
        <p>Your cart is empty.</p>
        <Link to="/" className="link dim blue">Continue shopping</Link>
      </div>
    );
  }

  return (
    <div className="center mw7 mv4">
      <div className="bg-white pa3 mb3">
        <h2 className="f2 mb2">Cart</h2>
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
              <tr key={item._id}>
                <td className="tl pv2">{item.title ?? item.description ?? item.alt_description}</td>
                <td className="tr pv2">
                  <a
                    className="pointer ba b--black-10 pv1 ph2 mr2"
                    onClick={() => updateItemQuantity(item._id, Math.max(0, (item.quantity || 0) - 1))}
                  >
                    -
                  </a>
                  {item.quantity}
                  <a
                    className="pointer ba b--black-10 pv1 ph2 ml2"
                    onClick={() => updateItemQuantity(item._id, (item.quantity || 0) + 1)}
                  >
                    +
                  </a>
                </td>
                <td className="tr pv2">${(Number(item.price) * Number(item.quantity)).toFixed(2)}</td>
                <td className="tr pv2">
                  <a className="pointer ba b--black-10 pv1 ph2" onClick={() => removeFromCart(item)}>
                    Remove
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="tr f4 mv3">
          Total: ${getCartTotal().toFixed(2)}
        </div>
      </div>
      <div className="flex justify-end pa3 mb3">
        <PurchaseForm />
      </div>
    </div>
  );
}
