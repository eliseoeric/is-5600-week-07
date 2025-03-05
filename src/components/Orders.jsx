import React, { useEffect, useState } from 'react';
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
      <h2 className="tc">Orders</h2>
      <div className="overflow-auto">
        <table className="w-100 collapse ba br2 b--black-10 pv2 ph3">
          <thead>
            <tr className="stripe-dark">
              <th className="tl pv2">Order ID</th>
              <th className="tl pv2">Buyer Email</th>
              <th className="tl pv2">Products</th>
              <th className="tl pv2">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr key={order._id} className="stripe-dark">
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
    </div>
  );
};

export default Orders;
