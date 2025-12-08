// src/components/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../state/CartProvider';

const Header = () => {
  const { cartItems } = useCart();
  
  // Calculate total items in cart
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="header">
      <nav className="nav">
        <Link to="/" className="logo">
          Shop
        </Link>
        
        <div className="nav-links">
          <Link to="/">Products</Link>
          <Link to="/orders">Orders</Link>
          <Link to="/cart" className="cart-link">
            Cart
            {totalItems > 0 && (
              <span className="cart-count">{totalItems}</span>
            )}
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;