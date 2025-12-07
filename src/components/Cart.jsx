import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../state/CartProvider";

const Header = () => {
  const { cartItems } = useCart();
  const totalItems = cartItems.reduce((acc, i) => acc + i.quantity, 0);

  return (
    <header>
      <Link to="/">Home</Link>
      <Link to="/cart">Cart ({totalItems})</Link>
    </header>
  );
};

export default Header;
