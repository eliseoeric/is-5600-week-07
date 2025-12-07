import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Header() {
  const { totalItems } = useCart();

  const linkClasses = ({ isActive }) =>
    "link dim black mr3 " + (isActive ? "b" : "");

  return (
    <header className="pa3 bb b--black-10 flex justify-between items-center">
      <Link to="/" className="link dim black f3 b">
        Site
      </Link>
      <nav className="flex items-center">
        <NavLink to="/" className={linkClasses} end>
          Products
        </NavLink>
        <NavLink to="/orders" className={linkClasses}>
          Orders
        </NavLink>
        <NavLink to="/cart" className={linkClasses}>
          Cart{" "}
          <span className="ba br-100 ph2 pv0 ml1">
            {totalItems}
          </span>
        </NavLink>
      </nav>
    </header>
  );
}

export default Header;
