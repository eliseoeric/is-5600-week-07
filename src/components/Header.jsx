import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../state/CartProvider";

export default function Header() {
  const { cartItems } = useCart();
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="dt w-100 border-box pa3 ph5-ns">
      <Link className="dtc v-mid mid-gray link dim w-25" to="/" title="Home">
        <img src="https://img.logoipsum.com/280.svg" className="dib w2 h2 br-100" alt="Site Name" />
      </Link>
      <div className="dtc v-mid w-75 tr">
        <Link className="link dim dark-gray f6 f5-ns dib mr3 mr4-ns" to="/">Products</Link>
        <Link className="link dim dark-gray f6 f5-ns dib mr3 mr4-ns" to="/orders">Orders</Link>
        <Link className="link dim dark-gray f6 f5-ns dib" to="/cart">
          Cart <span className="ba b--black-20 br-pill ph2 pv1">{totalItems}</span>
        </Link>
      </div>
    </nav>
  );
}
