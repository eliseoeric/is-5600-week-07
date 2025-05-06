import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../state/CartProvider";

const Header = () => {
  const { items } = useCart();
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="pa3 bg-light-gray">
      <Link to="/" className="mr3">Home</Link>
      <Link to="/cart" className="mr3">Cart ({itemCount})</Link>
      <Link to="/orders">Orders</Link>
    </nav>
  );
};

export default Header;