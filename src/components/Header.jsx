import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../state/CartProvider";

const Header = () => {
  const { cartItems } = useCart();
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="pa3 bg-black-80 white flex items-center justify-between">
      <Link to="/" className="no-underline white">
        <h1 className="ma0 f3">Fullstack Prints</h1>
      </Link>

      <nav className="flex items-center">
        <Link to="/orders" className="white no-underline mh2">
          Orders
        </Link>

        <Link
          to="/cart"
          className="white no-underline mh2 flex items-center"
          aria-label="Cart"
        >
          <span className="mr2">Cart</span>
          <span className="br-pill ba ph2 pv1">
            {totalItems}
          </span>
        </Link>
      </nav>
    </header>
  );
};

export default Header;
