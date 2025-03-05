import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../state/CartProvider';

const Header = () => {
  const { cartItems } = useCart();
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="dt w-100 border-box pa3 ph5-ns">
      <div className="dtc v-mid w-25">
        <Link className="link dim dark-gray f4 fw6 dib" to="/" title="Fullstack Prints">Fullstack Prints</Link>
      </div>
      <div className="dtc v-mid w-75 tr">
        <Link className="link dim dark-gray f6 f5-ns dib mr3 mr4-ns" to="/" title="Products">Products</Link>
        <Link className="link dim dark-gray f6 f5-ns dib mr3 mr4-ns" to="/orders" title="Orders">Orders</Link>
        <Link className="link dim dark-gray f6 f5-ns dib" to="/cart" title="Cart">
          Cart <span className="ba b--black-20 br-pill pa2">{totalItems}</span>
        </Link>
      </div>
    </nav>
  );
};

export default Header;
