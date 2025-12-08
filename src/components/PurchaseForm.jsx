import React from 'react';
import { useCart } from '../state/CartProvider';
import { BASE_URL } from '../config';

export default function PurchaseForm() {
  const { cartItems } = useCart();
  const [buyerEmail, setBuyerEmail] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const products = cartItems.map((item) => item._id);

    const order = {
      buyerEmail,
      products,
      status: 'PENDING', // valid according to your enum
    };

    try {
      const url = `${BASE_URL}/orders`; // or `${BASE_URL}/api/orders` if your backend uses /api

      console.log('POSTing order to:', url, order);

      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(order),
      });

      const contentType = res.headers.get('content-type') || '';
      const rawText = await res.text(); // read once

      if (!res.ok) {
        console.error('Server error:', res.status, rawText);
        throw new Error(`Request failed with status ${res.status}`);
      }

      if (!contentType.includes('application/json')) {
        console.error('Expected JSON, got:', rawText);
        throw new Error('Response is not JSON');
      }

      const data = JSON.parse(rawText);
      console.log('Order created:', data);

      setBuyerEmail('');
      alert('Order placed successfully!');
    } catch (error) {
      console.error('Error creating order:', error);
      alert('Failed to place order. Check console for details.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="pt4 pb4 pl2 black-80 w-50" onSubmit={handleSubmit}>
      <fieldset className="cf bn ma0 pa0">
        <div className="cf mb2">
          <input
            className="f6 f5-l input-reset fl black-80 ba b--black-20 bg-white pa3 lh-solid w-100 w-70-l br2-ns br--left-ns"
            placeholder="Email Address"
            value={buyerEmail}
            onChange={(e) => setBuyerEmail(e.target.value)}
            type="email"
            required
          />
          <input
            className="f6 f5-l button-reset fl pv3 tc bn bg-animate bg-black-70 hover-bg-black white pointer w-100 w-30-l br2-ns br--right-ns"
            type="submit"
            value={isSubmitting ? 'Purchasing...' : 'Purchase'}
            disabled={isSubmitting || cartItems.length === 0}
          />
        </div>
        <small className="f6 black-60 db mb2">
          Enter your email address to complete purchase
        </small>
      </fieldset>
    </form>
  );
}
