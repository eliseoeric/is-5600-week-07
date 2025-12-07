import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../state/CartProvider';

const Header = () => {
  const { cartItems } = useCart();
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="pa3 bg-dark-gray white">
      <nav className="flex justify-between items-center">
        <Link to="/" className="link white b">
          Fullstack Prints
        </Link>
        <div className="flex gap2">
          <Link to="/orders" className="link white">
            Orders
          </Link>
          <Link to="/cart" className="link white">
            Cart ({totalItems})
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;