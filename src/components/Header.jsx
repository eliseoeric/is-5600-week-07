// src/components/Header.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../state/CartProvider";

export default function Header() {
  const { cartItems } = useCart();
  const totalItems = cartItems.reduce((s, i) => s + Number(i.quantity || 0), 0);

  const headerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 14px",
    borderBottom: "1px solid #eee",
    marginBottom: 12,
    background: "#fff",
  };

  return (
    <header style={headerStyle}>
      <div>
        <Link to="/" style={{ textDecoration: "none", color: "#333", fontWeight: 700 }}>
          My Shop
        </Link>
      </div>
      <nav>
        <Link to="/" style={{ margin: "0 10px" }}>
          Products
        </Link>
        <Link to="/orders" style={{ margin: "0 10px" }}>
          Orders
        </Link>
        <Link to="/cart" style={{ margin: "0 10px" }}>
          Cart <span style={{ marginLeft: 6, padding: "3px 7px", border: "1px solid #ccc", borderRadius: 12 }}>{totalItems}</span>
        </Link>
      </nav>
    </header>
  );
}
