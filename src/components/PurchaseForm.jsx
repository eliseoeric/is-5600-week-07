import React, { useState } from 'react';
import { useCart } from '../state/CartProvider';
import { BASE_URL } from '../config';

export default function PurchaseForm() {
  const { cartItems, getCartTotal } = useCart();
  const [buyerEmail, setBuyerEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const products = cartItems.map((item) => item._id);

    const order = {
      buyerEmail,
      products,
      total: getCartTotal(),
      status: 'PENDING',
    };

    try {
      const res = await fetch(${BASE_URL}/orders, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(order),
      });

      const data = await res.json();
      console.log('Order created:', data);

      alert('Order placed successfully!');
    } catch (error) {
      console.error('Error creating order:', error);
      alert('Error placing order');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Email Address"
        value={buyerEmail}
        onChange={(e) => setBuyerEmail(e.target.value)}
      />

      <button type="submit">
        Purchase
      </button>

      <p>Enter your email address to complete purchase</p>
    </form>
  );
}