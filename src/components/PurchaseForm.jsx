import React, { useState } from "react";
import { useCart } from "../state/CartProvider";
import { BASE_URL } from "../config";

const PurchaseForm = () => {
  const { items } = useCart();
  const [email, setEmail] = useState("");

  const submitOrder = (e) => {
    e.preventDefault();
    const orderPayload = {
      buyerEmail: email,
      products: items.map(i => i._id),
      status: "PENDING"
    };

    fetch(`${BASE_URL}/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderPayload)
    })
      .then(res => res.json())
      .then(console.log)
      .catch(console.error);
  };

  return (
    <form onSubmit={submitOrder} className="mt3">
      <input
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
        className="pa2 mr2"
      />
      <button type="submit" className="pa2 bg-blue white">Submit Order</button>
    </form>
  );
};

export default PurchaseForm;
