import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../state/CartProvider';
import { BASE_URL } from '../config';

export default function PurchaseForm() {
  const { cartItems, clearCart } = useCart();
  const [buyerEmail, setBuyerEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Prevent multiple submissions
    if (isSubmitting) return;
    
    // Check if cart is empty
    if (cartItems.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    
    setIsSubmitting(true);

    const products = cartItems.map((item) => item._id);

    const order = {
      buyerEmail,
      products,
      status: "PENDING",
    };
    
    try {
      // Post cart to orders API
      const response = await fetch(`${BASE_URL}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(order),
      });

      if (!response.ok) {
        throw new Error('Failed to create order');
      }

      const data = await response.json();
      console.log('Order created:', data);
      
      // Clear the cart after successful order
      clearCart();
      
      // Show success message
      alert('Order placed successfully! Your cart has been cleared.');
      
      // Reset email field
      setBuyerEmail('');
      
      // Navigate to orders page to see the new order
      navigate('/orders');
      
    } catch (error) {
      console.error('Error creating order:', error);
      alert('Failed to place order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="pt4 pb4 pl2 black-80 w-50" onSubmit={handleSubmit}>
      <fieldset className="cf bn ma0 pa0" disabled={isSubmitting}>
        <div className="cf mb2">
          <input 
            className="f6 f5-l input-reset fl black-80 ba b--black-20 bg-white pa3 lh-solid w-100 w-70-l br2-ns br--left-ns" 
            placeholder="Email Address" 
            value={buyerEmail} 
            onChange={(e) => setBuyerEmail(e.target.value)} 
            type="email" 
            required
            disabled={isSubmitting}
          />
          <input 
            className="f6 f5-l button-reset fl pv3 tc bn bg-animate bg-black-70 hover-bg-black white pointer w-100 w-30-l br2-ns br--right-ns" 
            type="submit" 
            value={isSubmitting ? "Processing..." : "Purchase"}
            disabled={isSubmitting}
          />
        </div>
        <small id="name-desc" className="f6 black-60 db mb2">
          Enter your email address to complete purchase
        </small>
      </fieldset>
    </form>
  );
}