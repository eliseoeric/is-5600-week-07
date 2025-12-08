// src/components/Cart.jsx
import React, { useState } from 'react';
import { useCart } from '../state/CartProvider';
import { BASE_URL } from '../config';

const Cart = () => {
  const { cartItems, updateItemQuantity, removeFromCart, getCartTotal } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmitOrder = async () => {
    setIsSubmitting(true);
    setMessage('');

    try {
      const orderData = {
        items: cartItems.map(item => ({
          productId: item.id,
          quantity: item.quantity,
          price: item.price
        })),
        total: getCartTotal()
      };

      const response = await fetch(`${BASE_URL}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData)
      });

      if (response.ok) {
        setMessage('Order placed successfully!');
        // Clear cart or show success message
      } else {
        setMessage('Failed to place order');
      }
    } catch (error) {
      setMessage('Error: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map(item => (
              <div key={item.id} className="cart-item">
                <div className="item-info">
                  <h4>{item.name}</h4>
                  <p>Price: ${item.price.toFixed(2)}</p>
                </div>
                
                <div className="quantity-controls">
                  <button 
                    onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  
                  <span className="quantity">{item.quantity}</span>
                  
                  <button 
                    onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>
                
                <div className="item-total">
                  <p>${(item.price * item.quantity).toFixed(2)}</p>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="remove-btn"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="cart-summary">
            <h3>Total: ${getCartTotal().toFixed(2)}</h3>
            
            {message && <div className="message">{message}</div>}
            
            <button 
              onClick={handleSubmitOrder}
              disabled={isSubmitting || cartItems.length === 0}
              className="submit-btn"
            >
              {isSubmitting ? 'Processing...' : 'Place Order'}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;