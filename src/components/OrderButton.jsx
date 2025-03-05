import React, { useContext } from 'react';
import { useCart } from '../state/CartProvider';

const OrderButton = () => {
  const { cartItems, getCartTotal } = useCart();

  const handleOrderSubmit = () => {
    const order = {
      items: cartItems,
      total: getCartTotal(),
    };

    fetch('https://your-node-api-url/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(order),
    })
      .then((res) => res.json())
      .then((data) => alert('Order created successfully!'))
      .catch((err) => alert('Error creating order: ' + err));
  };

  return (
    <button onClick={handleOrderSubmit} className="f6 link dim br3 ba bw1 ph3 pv2 mb2 dib black">
      Submit Order
    </button>
  );
};

export default OrderButton;
