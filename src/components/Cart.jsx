import React from 'react';
import { useCart } from '../state/CartProvider';
import PurchaseForm from './PurchaseForm';

const Cart = () => {
  // Get cart items and functions from the context
  const { cartItems, removeFromCart, updateItemQuantity, getCartTotal } = useCart();

  return (
    <div className="center mw7 mv4">
      <h2>Your Cart</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <table className="w-100 collapse">
          <thead>
            <tr>
              <th className="tl pv2">Product</th>
              <th className="tr pv2">Quantity</th>
              <th className="tr pv2">Price</th>
              <th className="tr pv2">Remove</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item._id}>
                <td className="tl pv2">{item.description}</td>
                <td className="tr pv2">
                  <button
                    className="pointer ba b--black-10 pv1 ph2 mr2"
                    onClick={() => updateItemQuantity(item._id, Math.max(1, item.quantity - 1))}
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
                <td className="tr pv2">${(item.price * item.quantity).toFixed(2)}</td>
                <td className="tr pv2">
                  <button className="pointer red" onClick={() => removeFromCart(item._id)}>
                    ❌
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <h3 className="tr">Total: ${getCartTotal().toFixed(2)}</h3>

      {cartItems.length > 0 && <PurchaseForm />}
    </div>
  );
};

export default Cart;
