import React, { useContext } from 'react';
import PurchaseForm from './PurchaseForm';
import { useContext } from "react";
import { CartContext } from "../state/CartProvider";

const Cart = () => {
  // TODO - get cart items from context
  const cartItems = [];
  const removeFromCart = () => {};
  const updateItemQuantity = () => {};
  const getCartTotal = () => {};
function Cart() {
  const { cart, clearCart } = useContext(CartContext);

  const handleCheckout = async () => {
    await fetch("http://localhost:3001/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ items: cart })
    });

    clearCart();
  };

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
            {cartItems && cartItems.map((item) => (
              <tr key={item._id}>
                <td className="tl pv2">{item.description}</td>
                <td className="tr pv2">
                  <a
                    className="pointer ba b--black-10 pv1 ph2 mr2"
                    onClick={() => updateItemQuantity(item._id, -1)}
                  >
                    -
                  </a>
                  {item.quantity}
                  <a
                    className="pointer ba b--black-10 pv1 ph2 ml2"
                    onClick={() => updateItemQuantity(item._id, 1)}
                  >
                    +
                  </a>
                </td>
                <td className="tr pv2">${item.price * item.quantity}</td>
                <td className="tr pv2">
                  <a
                    className="pointer ba b--black-10 pv1 ph2"
                    onClick={() => removeFromCart(item)}
                  >
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
    <div>
      <h2>Cart</h2>

      {cart.map((item, i) => (
        <p key={i}>{item.name}</p>
      ))}

      {cart.length > 0 && (
        <button onClick={handleCheckout}>
          Checkout
        </button>
      )}
    </div>
  );
};
}

export default Cart;
export default Cart;