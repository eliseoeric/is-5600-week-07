
import React, { useState } from 'react';
// Orders.js
import React, { useState, useEffect } from 'react';
import { BASE_URL } from '../config';

const Orders = () => {
@@ -9,35 +11,24 @@ const Orders = () => {
   * 1. Create a `fetchOrders` function that retrieves all orders from the database
   * 2. Using the `useEffect` hook, update the existing `orders` state object when `fetchOrders` is complete
   **/ 
  const fetchOrders = async () => {
    const response = await fetch(`${BASE_URL}/orders`);
    const data = await response.json();
    setOrders(data);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="center mw7 ba mv4">
      <div className="bg-white pa3 mb3">
        <h2 className="f2 mb2">Orders</h2>
        <table className="w-100">
          <thead>
            <tr>
              <th className="tl pv2">Order ID</th>
              <th className="tl pv2">Buyer Email</th>
              <th className="tl pv2">Products</th>
              <th className="tl pv2">Status</th>
@@ -25,7 +29,7 @@ const Orders = () => {
            </tr>
          </thead>
          <tbody>
            {orders && orders.map((order) => (
            {orders.map((order) => (
              <tr key={order._id}>
                <td className="tl pv2">{order._id}</td>
                <td className="tl pv2">{order.buyerEmail}</td>
                <td className="tl pv2">{order.products.join(', ')}</td>
                <td className="tl pv2">{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
                <td className="tl pv2">{order.buyerEmail}</td>