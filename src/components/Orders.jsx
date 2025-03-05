import React, { useState, useEffect } from 'react';
import { BASE_URL } from '../config';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  /**
   * Fetch all orders from the API
   */
  const fetchOrders = async () => {
    try {
      const response = await fetch(`${BASE_URL}/orders`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="center mw7 ba mv4">
      <h2 className="tc">Orders</h2>
      <table className="w-100 collapse">
        <thead>
          <tr>
            <th className="tl pv2">Order ID</th>
            <th className="tl pv2">Buyer Email</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td className="tl pv2">{order._id}</td>
              <td className="tl pv2">{order.buyerEmail}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
