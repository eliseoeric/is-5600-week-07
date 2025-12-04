// src/components/Orders.jsx
import React, { useState, useEffect } from 'react';
import { BASE_URL } from '../config';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}/orders`)
      .then(res => res.json())
      .then(data => setOrders(data))
      .catch(err => console.error("Error fetching orders:", err));
  }, []);

  if (!orders.length) return <div className="pa4 tc">No orders found.</div>;

  return (
    <div className="pa4 mw7 center">
      <h2>Previous Orders</h2>
      {orders.map((order) => (
        <div key={order._id || order.id} className="ba b--black-10 pa3 mv3">
          <div className="flex justify-between items-center mb3">
            <h3 className="f5 ma0">Order ID: {order._id || order.id}</h3>
            <span className="f6 fw6 bg-light-green pa1 br2">{order.status}</span>
          </div>
          <div className="pl3 bl b--black-10 bw2">
             {/* If the API returns items in the order, map them here. 
                 Assuming simplified display for now based on typical lab structures */}
             <p>Total Items: {order.items ? order.items.length : 0}</p>
             <p className="b">Total Cost: ${order.total ? order.total.toFixed(2) : "0.00"}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Orders;
