import React from 'react';
import PurchaseForm from './PurchaseForm';
import { useCart } from '../state/CartProvider';

const Cart = () => {
  const { cartItems, removeFromCart, getCartTotal, updateItemQuantity } = useCart();

  return (
    <div className="center mw7 mv4">
      <h2 className="f3 mb3">Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <table className="collapse ba br2 b--black-10 pv2 ph3">
          <thead>
            <tr>
              <th className="tl pv2 ph3">Item</th>
              <th className="tr pv2 ph3">Quantity</th>
              <th className="tr pv2 ph3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item._id}>
                <td className="tl pv2">{item.description ?? item.alt_description}</td>
                <td className="tr pv2">{item.quantity}</td>
                <td className="tr pv2">
                  <button
                    className="pointer ba b--black-10 pv1 ph2 mr2"
                    onClick={() => updateItemQuantity(item._id, item.quantity - 1)}
                  >
                    -
                  </button>
                  <button
                    className="pointer ba b--black-10 pv1 ph2 mr2"
                    onClick={() => updateItemQuantity(item._id, item.quantity + 1)}
                  >
                    +
                  </button>
                  <button
                    className="pointer ba b--black-10 pv1 ph2"
                    onClick={() => removeFromCart(item)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className="tr mt3">
        <strong>Total: ${getCartTotal()}</strong>
      </div>

      <div className="mv4">
        <PurchaseForm />
      </div>
    </div>
  );
};

export default Cart;
