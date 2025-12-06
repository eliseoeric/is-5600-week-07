// src/components/Header.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <h1>My Shop</h1>
      <nav>
        <Link to="/">Home</Link> | <Link to="/cart">Cart</Link>
      </nav>
      <hr />
    </header>
  );
}
