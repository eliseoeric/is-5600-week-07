import React from 'react';
import { useCart } from '../state/CartProvider';
import { BASE_URL } from '../config';

export default function PurchaseForm() {
  const { cartItems, removeFromCart } = useCart();
  const [buyerEmail, setBuyerEmail] = React.useState("");

 
  const [popup, setPopup] = React.useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!buyerEmail || cartItems.length === 0) {
      setPopup("Please enter an email and add at least one product.");
      setTimeout(() => setPopup(""), 2000);
      return;
    }

    const products = cartItems.map(item => ({
      _id: item._id,
      title: item.title,
      description: item.description,
      price: item.price,
      quantity: item.quantity,
    }));

    const order = { buyerEmail, products, status: 'Pending' };

    try {
      const res = await fetch(`${BASE_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Server error: ${res.status} ${text}`);
      }

      const data = await res.json();
      console.log('Order created:', data);

      cartItems.forEach(item => removeFromCart(item));
      setBuyerEmail('');

      
      setPopup("Order placed successfully!");
      setTimeout(() => setPopup(""), 2000);

    } catch (err) {
      console.error('Error creating order:', err);

      setPopup(`Failed to place order: ${err.message}`);
      setTimeout(() => setPopup(""), 2000);
    }
  };

  return (
    <>
      <form className="pt4 pb4 pl2 black-80 w-50" onSubmit={handleSubmit}>
        <fieldset className="cf bn ma0 pa0">
          <div className="cf mb2">
            <input
              type="email"
              className="f6 f5-l input-reset fl black-80 ba b--black-20 bg-white pa3 lh-solid w-100 w-70-l br2-ns br--left-ns"
              placeholder="Email Address"
              value={buyerEmail}
              onChange={(e) => setBuyerEmail(e.target.value)}
              required
            />
            <input
              type="submit"
              className="f6 f5-l button-reset fl pv3 tc bn bg-animate bg-black-70 hover-bg-black white pointer w-100 w-30-l br2-ns br--right-ns"
              value="Purchase"
            />
          </div>
          <small className="f6 black-60 db mb2">
            Enter your email address to complete purchase
          </small>
        </fieldset>
      </form>

      
      {popup && (
        <div
          style={{
            position: "fixed",
            bottom: "20px",
            left: "50%",
            transform: "translateX(-50%)",
            background: "#4ade80",
            color: "white",
            padding: "12px 20px",
            borderRadius: "8px",
            boxShadow: "0px 2px 10px rgba(0,0,0,0.2)",
            fontWeight: "600",
            zIndex: 9999,
            transition: "opacity 0.3s ease-in-out",
          }}
        >
          {popup}
        </div>
      )}
    </>
  );
}
