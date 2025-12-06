// src/components/Cart.jsx
import React, { useContext } from "react";
import { CartContext } from "../state/CartProvider";

export default function Cart() {
  const { cart } = useContext(CartContext);

  return (
    <div>
      <h2>Cart</h2>
      {cart.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        cart.map((item, index) => <div key={index}>{item.name}</div>)
      )}
    </div>
  );
}
