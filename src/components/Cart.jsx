import React, { useContext } from 'react';
import PurchaseForm from './PurchaseForm';

const Cart = () => {
  // TODO - get cart items from context
  const cartItems = [];
  const removeFromCart = () => {};
  const updateItemQuantity = () => {};
  const getCartTotal = () => {};

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
    </div>
  );
};

export default Cart;
// src/components/AddToCart.jsx
import React, { useContext } from "react";
import { CartContext } from "../state/CartProvider";

export default function AddToCart({ product }) {
  const { addToCart } = useContext(CartContext);

  const handleClick = () => {
    addToCart(product);
  };

  return (
    <button className="f6 link dim br3 ba bw1 ph3 pv2 mb2 dib black" onClick={handleClick}>
      Add to Cart
    </button>
  );
}
// src/components/Cart.jsx
import React from "react";
import { useCart } from "../state/CartProvider";

export default function Cart() {
  const { cartItems, updateItemQuantity, removeFromCart, getCartTotal } = useCart();

  if (!cartItems || cartItems.length === 0) return <div>Your cart is empty</div>;

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      <ul>
        {cartItems.map((item) => (
          <li key={item.id} style={{ marginBottom: 12 }}>
            <div><strong>{item.title || item.name}</strong></div>
            <div>Price: ${item.price}</div>
            <div>
              Quantity:
              <input
                type="number"
                value={item.quantity}
                min="0"
                onChange={(e) => {
                  const q = parseInt(e.target.value, 10);
                  updateItemQuantity(item.id, isNaN(q) ? 0 : q);
                }}
                style={{ width: 70, marginLeft: 8 }}
              />
              <button onClick={() => removeFromCart(item.id)} style={{ marginLeft: 8 }}>
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div>
        <strong>Total: ${getCartTotal().toFixed(2)}</strong>
      </div>
    </div>
  );
}

