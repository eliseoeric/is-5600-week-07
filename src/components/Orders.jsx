import React, { useState, useEffect } from 'react';
import { BASE_URL } from '../config';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch orders from API
  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/orders`);
      const data = await response.json();
      setOrders(data);
    } catch (err) {
      console.error('Error fetching orders:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch orders when component mounts
  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) {
    return <div className="tc pa4">Loading orders...</div>;
  }

  return (
    <div className="center mw7 ba mv4">
      <div className="bg-white pa3 mb3">
        <h2 className="f2 mb2">Orders</h2>
        {orders.length === 0 ? (
          <p className="tc pa4 gray">No orders yet</p>
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
                  <td className="tl pv2">{order._id.substring(0, 8)}...</td>
                  <td className="tl pv2">{order.buyerEmail}</td>
                  <td className="tl pv2">
                    {order.products.length} item(s)
                  </td>
                  <td className="tl pv2">
                    <span className={`ba br2 ph2 pv1 ${
                      order.status === 'COMPLETED' ? 'bg-light-green' :
                      order.status === 'PENDING' ? 'bg-light-yellow' :
                      'bg-light-gray'
                    }`}>
                      {order.status}
                    </span>
                  </td>
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