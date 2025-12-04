// src/components/Cart.jsx
import React from 'react';
import { useCart } from '../state/CartProvider';
import { BASE_URL } from '../config';

const Cart = () => {
  const { cartItems, updateItemQuantity, removeFromCart, getCartTotal } = useCart();

  const handleCheckout = () => {
    // Basic implementation to create an order
    const orderData = {
      items: cartItems,
      total: getCartTotal(),
      status: "pending"
    };

    fetch(`${BASE_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    })
    .then(res => res.json())
    .then(data => {
      alert("Order placed successfully!");
      // Optionally clear cart here if you implemented a clear function
    })
    .catch(err => console.error("Error placing order:", err));
  };

  if (cartItems.length === 0) {
    return <div className="pa4 tc">Your cart is empty.</div>;
  }

  return (
    <div className="pa4 mw7 center">
      <h2>Your Cart</h2>
      <div className="ba b--black-10">
        {cartItems.map((item) => (
          <div key={item.id} className="flex items-center justify-between pa3 bb b--black-10">
            <div className="flex items-center">
              <img src={item.urls.small} alt={item.description} className="h3 w3 br2 mr3" />
              <div>
                <h3 className="f5 ma0">{item.description || "Untitled"}</h3>
                <span className="f6 gray">${item.price}</span>
              </div>
            </div>
            <div className="flex items-center">
              <button 
                className="pointer pa2 ba b--black-10 bg-white"
                onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
              >-</button>
              <span className="mh3">{item.quantity}</span>
              <button 
                className="pointer pa2 ba b--black-10 bg-white"
                onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
              >+</button>
              <button 
                className="ml3 f6 link dim ph3 pv2 mb2 dib white bg-red pointer"
                onClick={() => removeFromCart(item)}
              >Remove</button>
            </div>
          </div>
        ))}
      </div>
      <div className="tr mt4">
        <h3>Total: ${getCartTotal().toFixed(2)}</h3>
        <button 
          className="f6 link dim ph3 pv2 mb2 dib white bg-green pointer"
          onClick={handleCheckout}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
