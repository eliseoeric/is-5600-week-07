// src/components/PurchaseForm.jsx
import React from 'react';
import { useCart } from '../state/CartProvider';
import { BASE_URL } from '../config';

export default function PurchaseForm() {
  const { cartItems, clearCart } = useCart();
  const [buyerEmail, setBuyerEmail] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!buyerEmail) {
      setError('Please enter an email address.');
      return;
    }
    if (!cartItems || cartItems.length === 0) {
      setError('Your cart is empty.');
      return;
    }

    // Build products payload (include id and quantity)
    const products = cartItems.map((item) => ({
      id: item.id || item._id,
      quantity: item.quantity || 1,
      price: Number(item.price) || 0,
      description: item.description ?? item.alt_description ?? item.title,
    }));

    const order = {
      buyerEmail,
      products,
      status: 'PENDING',
      createdAt: new Date().toISOString(),
    };

    try {
      setLoading(true);
      const res = await fetch(`${BASE_URL.replace(/\/$/, '')}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Server error ${res.status}: ${text}`);
      }

      const created = await res.json();
      console.log('Order created:', created);

      // 1) Clear the cart
      clearCart();

      // 2) Notify other parts of the app (Orders.jsx) that a new order exists
      window.dispatchEvent(new CustomEvent('ordersUpdated', { detail: created }));

      // Optional: reset form
      setBuyerEmail('');
      setError(null);
    } catch (err) {
      console.error('Error creating order:', err);
      setError(err.message || 'Failed to create order');
    } finally {
      setLoading(false);
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
            value={loading ? 'Purchasing...' : 'Purchase'}
            disabled={loading}
          />
        </div>
        <small id="name-desc" className="f6 black-60 db mb2">
          Enter your email address to complete purchase
        </small>
        {error ? <div style={{ color: 'crimson' }}>{error}</div> : null}
      </fieldset>
    </form>
  );
}
