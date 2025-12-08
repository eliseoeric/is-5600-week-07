import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../state/CartProvider";

export default function Header() {
  const { cartItems } = useCart();
  const totalItems = cartItems.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <nav className="pa3 flex justify-between">
      <Link to="/">Products</Link>

      <div>
        <Link to="/orders" className="mr3">
          Orders
        </Link>

        <Link to="/cart">
          Cart <span>({totalItems})</span>
        </Link>
      </div>
    </nav>
  );
}
