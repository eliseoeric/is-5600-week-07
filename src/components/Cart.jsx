import React from 'react';
import PurchaseForm from './PurchaseForm';
import { useCart } from '../state/CartProvider';

const Cart = () => {
  const { cartItems, removeFromCart, updateItemQuantity, getCartTotal } = useCart();

  return (
    <div className="center mw7 mv4">
      <h2 className="f3 b">Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p className="tc">Your cart is empty.</p>
      ) : (
        <div className="overflow-auto">
          <table className="w-100 collapse ba br2 b--black-10 pv2 ph3">
            <thead>
              <tr className="striped--near-white">
                <th className="tl pv2 ph3">Item</th>
                <th className="tl pv2 ph3">Quantity</th>
                <th className="tl pv2 ph3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item._id}>
                  <td className="tl pv2">{item.description ?? item.alt_description}</td>
                  <td className="tl pv2">{item.quantity}</td>
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
                      className="pointer bg-red white ba b--black-10 pv1 ph2"
                      onClick={() => removeFromCart(item._id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="tr f4 mv3">
            <strong>Total: ${getCartTotal().toFixed(2)}</strong>
          </div>
        </div>
      )}
      <div className="flex justify-end pa3 mb3">
        <PurchaseForm />
      </div>
    </div>
  );
};

export default Cart;
