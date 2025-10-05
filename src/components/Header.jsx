// src/components/Header.js
import React from "react";
import { useCart } from "../state/CartProvider";

const Header = () => {
  const { cartItems } = useCart();
  const totalItems = cartItems.reduce((a, i) => a + i.quantity, 0);

  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "15px 30px",
        background: "#282c34",
        color: "white",
        alignItems: "center",
      }}
    >
      <h1>🛍️ Fullstack Prints</h1>
      <nav>
        <a href="/" style={{ color: "white", marginRight: "20px" }}>
          Products
        </a>
        <a href="/cart" style={{ color: "white", marginRight: "20px" }}>
          🛒 Cart ({totalItems})
        </a>
        <a href="/orders" style={{ color: "white" }}>
          Orders
        </a>
      </nav>
    </header>
  );
};

export default Header;
