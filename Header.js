import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../state/CartProvider";

export default function Header() {
  const { cartItems } = useCart();
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="pa3 bg-light-gray flex justify-between items-center">
      <h1><Link to="/">Fullstack Prints</Link></h1>
      <nav>
        <Link to="/cart" className="mr3">
          🛒 Cart ({totalItems})
        </Link>
        <Link to="/orders">Orders</Link>
      </nav>
    </header>
  );
}