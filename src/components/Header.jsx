import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../state/CartProvider';

const Header = () => {
  const { cartItems } = useContext(CartContext);
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav>
      <Link to="/">Products</Link>
      <Link to="/orders">Orders</Link>
      <Link to="/cart">Cart ({totalItems})</Link>
    </nav>
  );
};

export default Header;