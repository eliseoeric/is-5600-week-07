import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../state/CartProvider";

export default function Header() {
  const { cartItems } = useCart();
  const total = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="pa3 bg-light-gray">
      <nav className="flex justify-between">
        <Link to="/">Home</Link>
        <Link to="/orders">Orders</Link>
        <Link to="/cart">Cart ({total})</Link>
      </nav>
    </header>
  );
}
