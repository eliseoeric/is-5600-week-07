import React, { useContext } from 'react';
import { CartContext } from '../state/CartProvider';
import PurchaseForm from './PurchaseForm';

const Cart = () => {
  const { cartItems, updateItemQuantity, removeFromCart, getCartTotal } = useContext(CartContext);

  if (cartItems.length === 0) {
    return (
      <div className="pa4 tc">
        <h2>Your cart is empty</h2>
      </div>
    );
  }

  return (
    <div className="pa4">
      <h2 className="f2 mb4">Your Cart</h2>
      {cartItems.map((item) => (
        <div key={item._id || item.id} className="flex items-center justify-between bb b--light-gray pv3">
          <div className="flex items-center">
            <img src={item.urls?.small || item.image} alt={item.description} className="w3 h3 mr3" />
            <div>
              <p className="f5 fw6 ma0">{item.description}</p>
              <p className="f6 gray ma0">${item.price} each</p>
            </div>
          </div>
          <div className="flex items-center">
            <input
              type="number"
              min="1"
              value={item.quantity}
              onChange={(e) => updateItemQuantity(item._id || item.id, Math.max(1, parseInt(e.target.value) || 1))}
              className="w3 tc ba b--light-gray pa1 mr2"
            />
            <p className="f5 fw6 w3 tr mr3">${(item.price * item.quantity).toFixed(2)}</p>
            <button onClick={() => removeFromCart(item._id || item.id)} className="f6 link dim br2 ba ph2 pv1 dib dark-red pointer">
              Remove
            </button>
          </div>
        </div>
      ))}
      <div className="tr mt4">
        <p className="f3 fw6">Total: ${getCartTotal().toFixed(2)}</p>
      </div>
      <PurchaseForm />
    </div>
  );
};

export default Cart;