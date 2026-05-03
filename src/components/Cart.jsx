import React from 'react';
import PurchaseForm from './PurchaseForm';
import { useStore } from '../state/StoreContext';

const Cart = () => {
  const {
    cartItems,
    removeFromCart,
    updateCartQuantity,
    cartTotal,
    cartCount,
  } = useStore();

  return (
    <div className="center mw7 mv4">
      <div className="bg-white pa3 mb3">
        <h2 className="f2 mb2">Cart</h2>
        {cartItems.length === 0 ? (
          <p className="mv3">Your cart is empty. Add a product to begin.</p>
        ) : (
          <>
            <table className="w-100 ba pa2 collapse">
              <thead>
                <tr>
                  <th className="tl pv2">Product</th>
                  <th className="tr pv2">Quantity</th>
                  <th className="tr pv2">Price</th>
                  <th className="tr pv2">Action</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item._id}>
                    <td className="tl pv2">{item.description || item.alt_description || 'Untitled'}</td>
                    <td className="tr pv2">
                      <button
                        className="pointer ba b--black-10 pv1 ph2 mr2 bg-white"
                        type="button"
                        onClick={() => updateCartQuantity(item._id, -1)}
                      >
                        -
                      </button>
                      {item.quantity}
                      <button
                        className="pointer ba b--black-10 pv1 ph2 ml2 bg-white"
                        type="button"
                        onClick={() => updateCartQuantity(item._id, 1)}
                      >
                        +
                      </button>
                    </td>
                    <td className="tr pv2">${(item.price * item.quantity).toFixed(2)}</td>
                    <td className="tr pv2">
                      <button
                        className="pointer ba b--black-10 pv1 ph2 bg-white"
                        type="button"
                        onClick={() => removeFromCart(item._id)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="tr f4 mv3">Total: ${cartTotal.toFixed(2)}</div>
          </>
        )}
      </div>
      <div className="flex justify-end pa3 mb3">
        <PurchaseForm />
      </div>
    </div>
  );
};

export default Cart;
