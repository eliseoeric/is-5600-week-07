// src/components/Orders.jsx

import React, { useState, useEffect } from 'react';
import { BASE_URL } from '../config';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  /**
   * TODO
   * 1. Create a `fetchOrders` function that retrieves all orders from the database
   * 2. Using the `useEffect` hook, update the existing `orders` state object when `fetchOrders` is complete
   **/ 

  const fetchOrders = async () => {
    try {
      const response = await fetch(`${BASE_URL}/orders`);
      const data = await response.json();
      setOrders(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="center mw7 mv4">
        <div className="bg-white pa3 mb3">
          <h2 className="f2 mb2">Orders</h2>
          <div className="loading-spinner">Loading orders...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="center mw7 mv4">
      <div className="bg-white pa3 mb3">
        <h2 className="f2 mb2">Orders</h2>
        {orders.length === 0 ? (
          <p className="tc pv4">No orders yet. Add items to your cart and checkout!</p>
        ) : (
          <table className="w-100">
            <thead>
              <tr>
                <th className="tl pv2">Order ID</th>
                <th className="tl pv2">Buyer Email</th>
                <th className="tl pv2">Products</th>
                <th className="tl pv2">Status</th>
               </tr>
            </thead>
            <tbody>
              {orders && orders.map((order) => (
                <tr key={order._id}>
                  <td className="tl pv2">{order._id}</td>
                  <td className="tl pv2">{order.buyerEmail}</td>
                  <td className="tl pv2">
                    {order.products && order.products.map(p => p.title || p).join(', ')}
                  </td>
                  <td className="tl pv2">{order.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Orders;