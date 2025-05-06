import React, { useEffect, useState } from "react";
import { BASE_URL } from "../config";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //  Fetch Orders from API when component mounts
  useEffect(() => {
    fetchOrders();
  }, []);

  // Function to fetch orders
  const fetchOrders = async () => {
    try {
      const response = await fetch(`${BASE_URL}/orders`);
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      setOrders(data);
    } catch (err) {
      console.error("Error fetching orders:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="center mw7 ba mv4">
      <div className="bg-white pa3 mb3">
        <h2 className="f2 mb2">Orders</h2>

        {/* Display Loading Message */}
        {loading ? (
          <p>Loading orders...</p>
        ) : error ? (
          <p className="red">Error: {error}</p>
        ) : orders.length === 0 ? (
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
                    {order.products.map((p) => p.name || p._id).join(", ")}
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