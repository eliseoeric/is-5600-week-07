import React from 'react';
import { useCart } from '../state/CartProvider';
import PurchaseForm from './PurchaseForm';

const Cart = () => {
  // Get cart items and functions from context
  const { cartItems, removeFromCart, updateItemQuantity, getCartTotal } = useCart();

  return (
    <div className="center mw7 mv4">
      <div className="bg-white pa3 mb3">
        <h2 className="f2 mb2">Cart</h2>
        {cartItems && cartItems.length > 0 ? (
          <>
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
                {cartItems.map((item) => (
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
                    <td className="tr pv2">${(item.price * item.quantity).toFixed(2)}</td>
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
          </>
        ) : (
          <div className="pa4 tc gray">
            <p className="f4">Your cart is empty</p>
            <a href="/" className="f6 link dim br3 ba bw1 ph3 pv2 mb2 dib black mt3">
              Continue Shopping
            </a>
          </div>
        )}
      </div>
      {cartItems && cartItems.length > 0 && (
        <div className="flex justify-end pa3 mb3">
          <PurchaseForm />
        </div>
      )}
    </div>
  );
};

export default Cart;