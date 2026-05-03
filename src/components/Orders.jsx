import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../config';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const res = await fetch(${BASE_URL}/orders);
      const data = await res.json();

      console.log('Orders data:', data);

      setOrders(Array.isArray(data) ? data : data.orders || []);
    } catch (err) {
      console.error('Error fetching orders:', err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="center mw7 mv4">
      <div className="bg-white pa3 ba b--black-10">
        <h2>Orders</h2>

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
              <tr key={order._id || order.id}>
                <td className="pv2">{order._id || order.id}</td>
                <td className="pv2">{order.buyerEmail}</td>
                <td className="pv2">
                  {order.products ? order.products.length : 0}
                </td>
                <td className="pv2">{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {orders.length === 0 && <p>No orders found.</p>}
      </div>
    </div>
  );
};

export default Orders;