import React, { useState, useEffect } from 'react';
import { BASE_URL } from '../config';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  // ✅ Fetch all orders from backend
  const fetchOrders = async () => {
    try {
      const response = await fetch(`${BASE_URL}/orders`);
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    }
  };

  // ✅ Fetch once on component mount
  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="center mw7 ba mv4">
      <div className="bg-white pa3 mb3">
        <h2 className="f2 mb2">Orders</h2>
        {orders.length === 0 ? (
          <p>No orders found.</p>
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
              {orders.map((order) => (
                <tr key={order._id}>
                  <td className="tl pv2">{order._id}</td>
                  <td className="tl pv2">{order.buyerEmail}</td>
                  <td className="tl pv2">
                    {order.products && order.products.length > 0
                      ? order.products.map(p => p.description).join(', ')
                      : 'No products'}
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