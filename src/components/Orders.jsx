// src/components/Orders.js
import React, { useState, useEffect } from 'react';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/orders')
      .then(response => response.json())
      .then(data => setOrders(data))
      .catch(error => console.error('Error fetching orders:', error));
  }, []);

  return (
    <div>
      <h1>Your Orders</h1>
      <ul>
        {orders.map(order => (
          <li key={order.id}>
            <img src="https://thumbs.dreamstime.com/b/smart-phone-cartoon-thumb-up-white-background-48227025.jpg" alt="Order" width="50" height="50" />
            <p>Order ID: {order.id}</p>
            <p>Total: ${order.total}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Orders;
