import React, { useState } from 'react';
import { BASE_URL } from '../config';
import React, { useState, useEffect } from 'react';
import { BASE_URL } from '../config'; // Ensure this file contains the correct API base URL

const Orders = () => {
  const [orders, setOrders] = useState([]);

  /**
   * TODO
   * 1. Create a `fetchOrders` function that retrieves all orders from the database
   * 2. Using the `useEffect` hook, update the existing `orders` state object when `fetchOrders` is complete
   **/ 
   * Fetch all orders from the database.
   */
  const fetchOrders = async () => {
    try {
      const response = await fetch(`${BASE_URL}/orders`);
      if (!response.ok) {
        throw new Error('Failed to fetch orders');
      }
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  // Fetch orders when the component mounts
  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="center mw7 ba mv4">
      <div className="bg-white pa3 mb3">
        <h2 className="f2 mb2">Orders</h2>
        <table className="w-100">
        <table className="w-100 ba pa2">
          <thead>
            <tr>
              <th className="tl pv2">Order ID</th>
@@ -25,19 +39,27 @@ const Orders = () => {
            </tr>
          </thead>
          <tbody>
            {orders && orders.map((order) => (
              <tr key={order._id}>
                <td className="tl pv2">{order._id}</td>
                <td className="tl pv2">{order.buyerEmail}</td>
                <td className="tl pv2">{order.products.join(', ')}</td>
                <td className="tl pv2">{order.status}</td>
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr key={order._id}>
                  <td className="tl pv2">{order._id}</td>
                  <td className="tl pv2">{order.buyerEmail}</td>
                  <td className="tl pv2">{order.products.join(', ')}</td>
                  <td className="tl pv2">{order.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="tc pv3">
                  No orders found.
                </td>
              </tr>
            ))}
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
export default Orders;