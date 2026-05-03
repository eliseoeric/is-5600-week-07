import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../state/CartProvider';

const Header = () => {
  const { cartItems } = useCart();
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="bg-black w-100 ph3 pv3 pv4-ns ph4-m ph5-l">
      <nav className="f6 fw6 ttu tracked">
        <Link className="link dim white dib mr3" to="/">Home</Link>
        <Link className="link dim white dib mr3" to="/orders">Orders</Link>
        <Link className="link dim white dib" to="/cart">
          Cart ({totalItems})
        </Link>
      </nav>
    </header>
  );
};

export default Header;