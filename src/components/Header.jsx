import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../state/CartProvider";

const Header = () => {
  const { cartItems } = useCart();
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="pa3 bg-light-gray flex justify-between items-center">
      <Link to="/" className="f4 fw6 link dim black">
        Fullstack Prints
      </Link>

      <nav>
        <Link to="/cart" className="f5 link dim black ml3">
          🛒 Cart ({totalItems})
        </Link>
      </nav>
    </header>
  );
};

export default Header;
