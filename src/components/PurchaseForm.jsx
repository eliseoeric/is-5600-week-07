import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../state/CartProvider';
import { BASE_URL } from '../config';

const PurchaseForm = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { cartItems } = useCart();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      setError('Please enter your email');
      return;
    }

    if (cartItems.length === 0) {
      setError('Your cart is empty');
      return;
    }

    try {
      setLoading(true);
      setError('');

      // Create order with product IDs
      const productIds = cartItems.map(item => item._id);

      const response = await fetch(`${BASE_URL}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          buyerEmail: email,
          products: productIds,
          status: 'CREATED'
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create order');
      }

      const order = await response.json();
      console.log('Order created:', order);

      // Success! Redirect to orders page
      alert('Order placed successfully!');
      navigate('/orders');
      
    } catch (err) {
      console.error('Error creating order:', err);
      setError('Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white pa3 br2 ba b--black-10">
      <h3 className="f4 mb3">Complete Purchase</h3>
      
      {error && (
        <div className="bg-light-red pa2 mb3 br2">
          <p className="ma0 dark-red">{error}</p>
        </div>
      )}

      <div className="mb3">
        <label htmlFor="email" className="db mb2 f6">Email Address:</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          className="input-reset ba b--black-20 pa2 mb2 db w-100"
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading || cartItems.length === 0}
        className="f6 link dim br3 ph3 pv2 mb2 dib white bg-black pointer bn"
      >
        {loading ? 'Processing...' : 'Place Order'}
      </button>
    </form>
  );
};

export default PurchaseForm;