import React, { useContext } from 'react';
import React from 'react';
import { useCart } from '../state/CartProvider';
import PurchaseForm from './PurchaseForm';

const Cart = () => {
  // TODO - get cart items from context
  const cartItems = [];
  const removeFromCart = () => {};
  const updateItemQuantity = () => {};
  const getCartTotal = () => {};
  const { cartItems, removeFromCart, updateItemQuantity, getCartTotal } = useCart();

  return (
    <div className="center mw7 mv4">
@@ -22,32 +19,29 @@ const Cart = () => {
            </tr>
          </thead>
          <tbody>
            {cartItems && cartItems.map((item) => (
            {cartItems.map((item) => (
              <tr key={item._id}>
                <td className="tl pv2">{item.description}</td>
                <td className="tr pv2">
                  <a
                  <button
                    className="pointer ba b--black-10 pv1 ph2 mr2"
                    onClick={() => updateItemQuantity(item._id, -1)}
                    onClick={() => updateItemQuantity(item._id, item.quantity - 1)}
                  >
                    -
                  </a>
                  </button>
                  {item.quantity}
                  <a
                  <button
                    className="pointer ba b--black-10 pv1 ph2 ml2"
                    onClick={() => updateItemQuantity(item._id, 1)}
                    onClick={() => updateItemQuantity(item._id, item.quantity + 1)}
                  >
                    +
                  </a>
                  </button>
                </td>
                <td className="tr pv2">${item.price * item.quantity}</td>
                <td className="tr pv2">${(item.price * item.quantity).toFixed(2)}</td>
                <td className="tr pv2">
                  <a
                    className="pointer ba b--black-10 pv1 ph2"
                    onClick={() => removeFromCart(item)}
                  >
                  <button className="pointer ba b--black-10 pv1 ph2" onClick={() => removeFromCart(item)}>
                    Remove
                  </a>
                  </button>
                </td>
              </tr>
            ))}
@@ -64,4 +58,4 @@ const Cart = () => {
  );
};

export default Cart;
export default Cart;