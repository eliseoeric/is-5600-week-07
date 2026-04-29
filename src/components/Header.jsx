import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../state/CartProvider";

export default function Header() {
  const { cart } = useCart();

  return (
    <nav className="dt w-100 border-box pa3 ph5-ns">
      <Link className="dtc v-mid mid-gray link dim w-25" to="/">
        <img src="/280.svg" className="dib w2 h2 br-100" alt="Site" />
      </Link>

      <div className="dtc v-mid w-75 tr">
        <Link className="link dim dark-gray f6 f5-ns dib mr3 mr4-ns" to="/products">
          Products
        </Link>

        <Link className="link dim dark-gray f6 f5-ns dib mr3 mr4-ns" to="/orders">
          Orders
        </Link>

        <Link className="link dim dark-gray f6 f5-ns dib" to="/cart">
          Cart <span className="ba br-100 pa2">{cart.length}</span>
        </Link>
      </div>
    </nav>
  );
}