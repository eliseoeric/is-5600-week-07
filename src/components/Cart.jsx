import React from 'react';
import { useCart } from '../state/CartProvider';

const Cart = () => {
  // Get cart items and functions from context
  const { cartItems, removeFromCart, updateItemQuantity, getCartTotal } = useCart();

  return (
    <div className="center mw7 mv4">
      <table className="w-100">
        <thead>
          <tr>
            <th className="tl">Item</th>
            <th className="tr">Quantity</th>
            <th className="tr">Price</th>
            <th className="tr">Remove</th>
          </tr>
        </thead>
        <tbody>
          {cartItems && cartItems.length > 0 ? (
            cartItems.map((item) => (
              <tr key={item._id}>
               <td className="tl pv2">{item.description ?? item.alt_description ?? 'No Description'}</td>
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
                    onClick={() => removeFromCart(item._id)} // assuming item._id is used to remove
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
        {/* Add code to display the cart total */}
        <strong>Total: ${getCartTotal().toFixed(2)}</strong>
      </div>

      <PurchaseForm />
    </div>
  );
};

export default Cart;
