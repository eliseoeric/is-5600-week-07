import React, { useState, useEffect } from 'react';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  // 1. Create the fetchOrders function
  const fetchOrders = async () => {
    try {
      const response = await fetch('https://plankton-app-9p6gs.ondigitalocean.app/orders');
      const data = await response.json();
      setOrders(data); // Update the orders state with the fetched data
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  // 2. Use the useEffect hook to fetch orders on component mount
  useEffect(() => {
    fetchOrders();
  }, []); // Empty dependency array ensures this runs only once when the component mounts

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
            </tr>
          </thead>
          <tbody>
            {orders && orders.map((order) => (
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
