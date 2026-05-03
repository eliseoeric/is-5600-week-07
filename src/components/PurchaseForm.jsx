import React, { useState } from 'react';
import { useStore } from '../state/StoreContext';

export default function PurchaseForm() {
  const { cartItems, createOrder, loading } = useStore();
  const [buyerEmail, setBuyerEmail] = useState('');
  const [message, setMessage] = useState('');
  const [formError, setFormError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setFormError('');

    if (cartItems.length === 0) {
      setFormError('Your cart is empty. Add products before submitting.');
      return;
    }

    const result = await createOrder({ buyerEmail });
    if (result.success) {
      setMessage('Order submitted successfully!');
      setBuyerEmail('');
      return;
    }

    setFormError(result.error || 'Unable to process your order.');
  };

  return (
    <form className="pt4 pb4 pl2 black-80 w-100" onSubmit={handleSubmit}>
      <fieldset className="cf bn ma0 pa0">
        <div className="cf mb2">
          <input
            className="f6 f5-l input-reset fl black-80 ba b--black-20 bg-white pa3 lh-solid w-100 w-70-l br2-ns br--left-ns"
            placeholder="Email Address"
            value={buyerEmail}
            onChange={(e) => setBuyerEmail(e.target.value)}
            type="email"
          />
          <button
            className="f6 f5-l button-reset fl pv3 tc bn bg-animate bg-black-70 hover-bg-black white pointer w-100 w-30-l br2-ns br--right-ns"
            type="submit"
            disabled={loading.orderSubmit || cartItems.length === 0}
          >
            {loading.orderSubmit ? 'Submitting...' : 'Purchase'}
          </button>
        </div>
        <small id="name-desc" className="f6 black-60 db mb2">
          Enter your email address to complete purchase.
        </small>
        {formError && <div className="mv2 red">{formError}</div>}
        {message && <div className="mv2 green">{message}</div>}
      </fieldset>
    </form>
  );
}
