import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";

function Cart() {
  const { cart, clearCart } = useContext(CartContext);

  const checkout = () => {
    fetch("http://localhost:3001/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ items: cart }),
    })
      .then((res) => res.json())
      .then(() => {
        clearCart();
        alert("Order placed!");
      });
  };

  return (
    <div>
      <h2>Cart</h2>
      {cart.map((item, i) => (
        <p key={i}>{item.name}</p>
      ))}
      <button onClick={checkout}>Checkout</button>
    </div>
  );
}

export default Cart;