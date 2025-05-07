@@ -1,9 +1,11 @@
import React, {useContext} from 'react';
import { Link } from "react-router-dom";
import { useCart } from '../state/CartProvider';

const Header = () => {

  const totalItems = 0;
  const { cartItems } = useCart();
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="dt w-100 border-box pa3 ph5-ns">