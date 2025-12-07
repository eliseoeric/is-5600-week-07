import React, { useState } from "react";
import { useCart } from "../state/CartProvider";
import { BASE_URL } from "../config";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const {
    cartItems,
    updateItemQuantity,
    removeFromCart,
    getCartTotal,
  } = useCart();

  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleQuantityChange = (id, value) => {
    const qty = Number(value);
    if (qty < 1) return;
    updateItemQuantity(id, qty);
  };

  const handleRemove = (id) => {
    removeFromCart(id);
  };

  const handleSubmitOrder = async () => {
    if (cartItems.length === 0) return;

    setSubmitting(true);

    try {
      const res = await fetch(`${BASE_URL}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cartItems,
          total: getCartTotal(),
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to submit order");
      }

      alert("Order submitted!");
      navigate("/orders");
    } catch (error) {
      console.error(error);
      alert("Error submitting order");
    } finally {
      setSubmitting(false);
    }
  };

  i
