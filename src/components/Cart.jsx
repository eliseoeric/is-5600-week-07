// Cart.js
import React, { useContext } from 'react';
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
@@ -22,20 +20,20 @@ const Cart = () => {
            </tr>
          </thead>
          <tbody>
            {cartItems && cartItems.map((item) => (
            {cartItems.map((item) => (
              <tr key={item._id}>
                <td className="tl pv2">{item.description}</td>
                <td className="tr pv2">
                  <a
                    className="pointer ba b--black-10 pv1 ph2 mr2"
                    onClick={() => updateItemQuantity(item._id, -1)}
                    onClick={() => updateItemQuantity(item._id, item.quantity - 1)}
                  >
                    -
                  </a>
                  {item.quantity}
                  <a
                    className="pointer ba b--black-10 pv1 ph2 ml2"
                    onClick={() => updateItemQuantity(item._id, 1)}
                    onClick={() => updateItemQuantity(item._id, item.quantity + 1)}
                  >
                    +
                  </a>
@@ -64,4 +62,4 @@ const Cart = () => {
  );
};

export default Cart;
export default Cart;