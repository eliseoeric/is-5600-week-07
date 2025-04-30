import React, { useContext } from 'react';
import PurchaseForm from './PurchaseForm';
import { useCart } from '../state/CartProvider';

const Cart = () => {
  // TODO - get cart items from context
  const cartItems = [];
  const removeFromCart = () => {};
  const updateItemQuantity = () => {};
  const getCartTotal = () => {};
  // Get cart items and functions from context
  const { cartItems, removeFromCart, updateItemQuantity, getCartTotal } = useCart();

  return (
    <div className="center mw7 mv4">
@@ -22,35 +20,42 @@ const Cart = () => {
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
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <tr key={item._id}>
                  <td className="tl pv2">{item.description ?? item.alt_description}</td>
                  <td className="tr pv2">
                    <button
                      className="pointer ba b--black-10 pv1 ph2 mr2"
                      onClick={() => updateItemQuantity(item._id, -1)}
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    {item.quantity}
                    <button
                      className="pointer ba b--black-10 pv1 ph2 ml2"
                      onClick={() => updateItemQuantity(item._id, 1)}
                    >
                      +
                    </button>
                  </td>
                  <td className="tr pv2">${(item.price * item.quantity).toFixed(2)}</td>
                  <td className="tr pv2">
                    <button
                      className="pointer ba b--black-10 pv1 ph2"
                      onClick={() => removeFromCart(item._id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="tc pv3">Your cart is empty.</td>
              </tr>
            ))}
            )}
          </tbody>
        </table>
        <div className="tr f4 mv3">
@@ -64,4 +69,4 @@ const Cart = () => {
  );
};

export default Cart;
export default Cart;