// Header.jsx

import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../state/CartProvider";

const Header = () => {
  const { cartItems } = useCart();
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="flex justify-between pa3 bb b--light-gray">
      <Link to="/">🖼️ Fullstack Prints</Link>
      <nav>
        <Link to="/cart" className="mr3">Cart ({totalItems})</Link>
        <Link to="/orders">Orders</Link>
      </nav>
    </header>
  );
};

export default Header;
