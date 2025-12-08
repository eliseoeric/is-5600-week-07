import React from 'react';
import { useCart } from '../state/CartProvider';
import PurchaseForm from './PurchaseForm';

const Cart = () => {
  const { cartItems, removeFromCart, updateItemQuantity, getCartTotal } = useCart();

  const handleUpdateQuantity = (itemId, change) => {
    const item = cartItems.find(i => i._id === itemId);
    if (!item) return;
    
    const newQuantity = item.quantity + change;
    if (newQuantity >= 1) {
      updateItemQuantity(itemId, newQuantity);
    }
  };

  const items = Array.isArray(cartItems) ? cartItems : [];

  return (
    <div className="center mw7 mv4">
      <div className="bg-white pa3 mb3">
        <h2 className="f2 mb2">Cart</h2>
        {items.length === 0 ? (
          <p className="tc pa4 gray">Your cart is empty</p>
        ) : (
          <>
            <table className="w-100 ba pa2">
              <thead>
                <tr>
                  <th className="tl pv2 ph2">Product</th>
                  <th className="tr pv2 ph2">Quantity</th>
                  <th className="tr pv2 ph2">Price</th>
                  <th className="tr pv2 ph2">Action</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item._id} className="bb b--black-10">
                    <td className="tl pv2 ph2">
                      {item.description || item.alt_description || 'Product'}
                    </td>
                    <td className="tr pv2 ph2">
                      <button
                        className="pointer ba b--black-10 pv1 ph2 mr2 bg-white"
                        onClick={() => handleUpdateQuantity(item._id, -1)}
                      >
                        -
                      </button>
                      <span className="ph2">{item.quantity}</span>
                      <button
                        className="pointer ba b--black-10 pv1 ph2 ml2 bg-white"
                        onClick={() => handleUpdateQuantity(item._id, 1)}
                      >
                        +
                      </button>
                    </td>
                    <td className="tr pv2 ph2">
                      ${(item.likes * item.quantity).toFixed(2)}
                    </td>
                    <td className="tr pv2 ph2">
                      <button
                        className="pointer ba b--black-10 pv1 ph2 bg-white"
                        onClick={() => removeFromCart(item)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="tr f4 mv3 fw6">
              Total: ${getCartTotal().toFixed(2)}
            </div>
          </>
        )}
      </div>
      {items.length > 0 && (
        <div className="flex justify-end pa3 mb3">
          <PurchaseForm />
        </div>
      )}
    </div>
  );
};

export default Cart;