import React, { useState, useEffect } from 'react';
import { BASE_URL } from '../config';

export default function Orders() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = () => {
    fetch(`${BASE_URL}/orders`)
      .then(res => res.json())
      .then(data => setOrders(data));
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="pa4">
      <h1>Orders</h1>
      {orders.length === 0 ? (
        <p>No orders yet</p>
      ) : (
        orders.map((order) => (
          <div key={order.id} className="mb3 pa3 ba">
            <p><strong>Order {order.id}</strong></p>
            <p>Total: ${order.total}</p>
            <p>Items: {order.items && order.items.length}</p>
          </div>
        ))
      )}
    </div>
  );
}