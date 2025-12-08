// src/components/PurchaseForm.jsx
import React, { useState } from "react";
import { useCart } from "../state/CartProvider";
import { BASE_URL } from "../config";

export default function PurchaseForm() {
  const { cartItems, clearCart, getCartTotal } = useCart();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return setMessage("Please enter email");
    const order = {
      buyerEmail: email,
      products: cartItems.map((c) => ({ productId: c._id, quantity: c.quantity })),
      total: getCartTotal(),
    };
    setLoading(true);
    fetch(`${BASE_URL}/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Order creation failed");
        return res.json();
      })
      .then((data) => {
        setMessage("Order created");
        clearCart();
      })
      .catch((err) => {
        console.error(err);
        setMessage("Failed to create order");
      })
      .finally(() => setLoading(false));
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", gap: 8, alignItems: "center" }}>
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" style={{ padding: 8 }} />
      <button type="submit" disabled={loading || cartItems.length === 0}>{loading ? "Sending..." : `Purchase ($${getCartTotal().toFixed(2)})`}</button>
      {message && <div style={{ marginLeft: 12 }}>{message}</div>}
    </form>
  );
}
