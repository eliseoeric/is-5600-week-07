import React, { useState, useEffect } from 'react';  // Corrected import
import { BASE_URL } from '../config';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  // Fetch orders from the API
  const fetchOrders = async () => {
    try {
      const response = await fetch(`${BASE_URL}/orders`);
      if (!response.ok) {
        throw new Error('Failed to fetch orders');
      }
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  // Fetch orders on component mount
  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="center mw7 ba mv4">
      <table className="f6 w-100 mw8 center" cellSpacing="0">
        <thead>
          <tr>
            <th className="fw6 tl pa3">Order ID</th>
            <th className="fw6 tl pa3">Buyer Email</th>
            <th className="fw6 tl pa3">Products</th>
            <th className="fw6 tl pa3">Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 ? (
            orders.map((order) => (
              <tr key={order._id}>
                <td className="tl pv2">{order._id}</td>
                <td className="tl pv2">{order.buyerEmail}</td>
                <td className="tl pv2">{order.products?.join(', ') || 'No products'}</td>
                <td className="tl pv2">{order.status}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="tc pv3">No orders found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
