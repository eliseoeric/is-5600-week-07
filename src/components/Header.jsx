import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../state/CartProvider';

const Header = () => {
  const { cartItems } = useCart();
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="dt w-100 border-box pa3 ph5-ns">
      <Link to="/" className="dtc v-mid mid-gray link dim w-25" title="Home">
        <img src="https://img.logoipsum.com/280.svg" className="dib w2 h2 br-100" alt="Site Logo" />
      </Link>
      <div className="dtc v-mid w-75 tr">
        <Link to="/" className="link dim dark-gray f6 f5-ns dib mr3">Products</Link>
        <Link to="/orders" className="link dim dark-gray f6 f5-ns dib mr3">Orders</Link>
        <Link to="/cart" className="link dim dark-gray f6 f5-ns dib">
          Cart <span className="ba b--black-20 br-pill pa2">{itemCount}</span>
        </Link>
      </div>
    </nav>
  );
};

export default Header;
