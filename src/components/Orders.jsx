import React, { useState, useEffect } from 'react';
import { BASE_URL } from '../config';

const Orders = () => {
  const [orders, setOrders] = useState([]); // State to hold the list of orders
  const [error, setError] = useState(null); // State to handle any errors

  const fetchOrders = async () => {
    try {
      const response = await fetch(`${BASE_URL}/orders`);
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      setOrders(data);
    } catch (err) {
      console.error('Failed to fetch orders:', err);
      setError(err.message);
    }
  };

    useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="center mw7 ba mv4">
      <div className="bg-white pa3 mb3">
        <h2 className="f2 mb2">Orders</h2>
        {/* Display an error message if one exists */}
        {error && <div className="error red">{error}</div>}
        {!error && orders.length === 0 && <div>No orders available.</div>}
        {/* Display orders in a table */}
        {!error && orders.length > 0 && (
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
                  <td className="tl pv2">{order.products.join(', ')}</td>
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