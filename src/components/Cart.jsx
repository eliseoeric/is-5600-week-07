import React from 'react';
import { useCart } from '../state/CartProvider';
import PurchaseForm from './PurchaseForm';

const Cart = () => {
  // Getting cartItems and functions from context
  const { cartItems, removeFromCart, updateItemQuantity, getCartTotal } = useCart();

  return (
    <div className="center mw7 mv4">
      <div className="bg-white pa3 mb3">
        <h2 className="f2 mb2">Shopping Cart</h2>
        
        {cartItems.length === 0 ? (
          <p className="tc">Your cart is empty.</p>
        ) : (
          <div className="overflow-auto">
            <table className="w-100 collapse ba br2 b--black-10 pv2 ph3">
              <thead>
                <tr className="striped--near-white">
                  <th className="tl pv2 ph3">Product</th>
                  <th className="tr pv2 ph3">Quantity</th>
                  <th className="tr pv2 ph3">Price</th>
                  <th className="tr pv2 ph3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item._id}>
                    <td className="tl pv2">{item.description ?? item.alt_description}</td>
                    <td className="tr pv2">
                      <button
                        className="pointer ba b--black-10 pv1 ph2 mr2"
                        onClick={() => updateItemQuantity(item._id, item.quantity - 1)}
                      >
                        -
                      </button>
                      {item.quantity}
                      <button
                        className="pointer ba b--black-10 pv1 ph2 ml2"
                        onClick={() => updateItemQuantity(item._id, item.quantity + 1)}
                      >
                        +
                      </button>
                    </td>
                    <td className="tr pv2">${item.price * item.quantity}</td>
                    <td className="tr pv2">
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

        {/* Purchase Form */}
        <div className="flex justify-end pa3 mb3">
          <PurchaseForm />
        </div>
      </div>
    </div>
  );
};

export default Cart;
