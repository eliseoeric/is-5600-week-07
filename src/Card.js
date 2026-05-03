import React from 'react';
import { useCart } from '../state/CartProvider'; // Import the hook
import { Link } from 'react-router-dom';

const Cart = () => {
  // Extract values and functions from the Cart Context
  const { cartItems, updateItemQuantity, removeFromCart, getCartTotal } = useCart();

  return (
    <div className="pa4">
      <h1 className="f3">Your Shopping Cart</h1>
      
      {cartItems.length === 0 ? (
        <p>Your cart is empty. <Link to="/">Go shopping!</Link></p>
      ) : (
        <div className="mw8 center">
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center justify-between ba b--black-10 pv2 ph3 mb2">
              <div className="flex items-center">
                <img src={item.image} alt={item.name} className="w3 h3 object-cover mr3" />
                <div>
                  <h2 className="f5 mb1">{item.name}</h2>
                  <p className="f6 gray mt0">${item.price}</p>
                </div>
              </div>

              <div className="flex items-center">
                {/* Quantity Input */}
                <input
                  type="number"
                  className="w3 pa1 mr3"
                  value={item.quantity}
                  min="1"
                  onChange={(e) => updateItemQuantity(item.id, parseInt(e.target.value))}
                />
                
                {/* Remove Button */}
                <button 
                  className="f6 link dim br2 ph3 pv2 mb2 dib white bg-red bn pointer"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div className="tr mt4">
            <h3 className="f4">Total: ${getCartTotal().toFixed(2)}</h3>
            <button className="f5 link dim br2 ph4 pv3 mb2 dib white bg-blue bn pointer">
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;