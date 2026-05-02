import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../state/CartProvider';

const Header = () => {
  const { getCartCount } = useContext(CartContext);
  const cartCount = getCartCount();

  return (
    <header className="bg-black white pa3 flex justify-between items-center">
      <Link to="/" className="white link">
        <h1 className="f2 ma0">Fullstack Prints</h1>
      </Link>
      <nav>
        <Link to="/cart" className="white link pa2">
          Cart ({cartCount})
        </Link>
      </nav>
    </header>
  );
};

export default Header;