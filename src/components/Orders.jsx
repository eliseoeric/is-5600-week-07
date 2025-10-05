// src/components/Orders.jsx

import React, { useEffect, useState } from "react";
import { BASE_URL } from "../config";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  // Fetch orders from the Node API
  const fetchOrders = async () => {
    try {
      const res = await fetch(`${BASE_URL}/orders`);
      if (!res.ok) throw new Error(`Failed to fetch orders: ${res.status}`);
      const data = await res.json();
      setOrders(data);
    } catch (err) {
      console.error("Error fetching orders:", err);
    }
  };

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
                <tr key={order.id || order._id}>
                  <td className="tl pv2">{order.id || order._id}</td>
                  <td className="tl pv2">{order.buyerEmail || "test@example.com"}</td>
                  <td className="tl pv2">
                    {order.items
                      ? order.items.map((i) => i.name).join(", ")
                      : "No items"}
                  </td>
                  <td className="tl pv2">{order.status || "Confirmed"}</td>
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
