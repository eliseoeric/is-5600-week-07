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
// src/components/Cart.js
import { useCart } from "../state/CartProvider";
import { Link } from "react-router-dom";

export default function Cart() {
  const { cartItems, updateItemQuantity, removeFromCart, getCartTotal } = useCart();

  return (
    <div className="pa4">
      <h1>Your Cart</h1>

      {cartItems.length === 0 && <p>The cart is empty.</p>}

      {cartItems.map(item => (
        <div key={item.id} className="ba pa3 mv2">

          <h2>{item.name}</h2>
          <p>${item.price}</p>

          <input
            type="number"
            value={item.quantity}
            min="1"
            onChange={(e) =>
              updateItemQuantity(item.id, Number(e.target.value))
            }
          />

          <button
            className="ml3"
            onClick={() => removeFromCart(item.id)}
          >
            Remove
          </button>

        </div>
      ))}

      <h2>Total: ${getCartTotal()}</h2>

      <Link to="/orders">
        <button className="mt3">
          View Orders
        </button>
      </Link>

    </div>
  );
}
