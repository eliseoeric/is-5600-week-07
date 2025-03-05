import React from 'react';
import PurchaseForm from './PurchaseForm';
import { useCart } from '../state/CartProvider';

const Cart = () => {
  // Get cart items and functions from context
  const { cartItems, removeFromCart, updateItemQuantity, getCartTotal } = useCart();

  return (
    <div className="center mw7 mv4">
      <h2 className="tc">Shopping Cart</h2>
      <table className="w-100 collapse ba br2 b--black-10 pv2 ph3">
        <thead>
          <tr className="stripe-dark">
            <th className="tl pv2">Product</th>
            <th className="tr pv2">Quantity</th>
            <th className="tr pv2">Price</th>
            <th className="tr pv2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {cartItems?.length > 0 ? (
            cartItems.map((item) => (
              <tr key={item._id} className="stripe-dark">
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
          )}
        </tbody>
      </table>
      
      <div className="tr f4 mv3">
        <strong>Total: ${getCartTotal().toFixed(2)}</strong>
      </div>

      <PurchaseForm cartItems={cartItems} />
    </div>
  );
};

export default Cart;
