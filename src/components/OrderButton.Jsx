import React, { useContext } from 'react';
import { useCart } from '../state/CartProvider';

const OrderButton = () => {
  const { createOrder } = useCart();

  const handleCreateOrder = () => {
    createOrder();
  };

  return (
    <button onClick={handleCreateOrder}>Place Order</button>
  );
};

export default OrderButton;
