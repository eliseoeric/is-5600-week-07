// src/components/Orders.js
import React, { useState, useEffect } from "react";
import { BASE_URL } from "../config";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    const res = await fetch(`${BASE_URL}/orders`);
    const data = await res.json();
    setOrders(data);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div style={{ padding: "30px" }}>
      <h2>Orders</h2>
      {orders.map((order) => (
        <div
          key={order.id}
          style={{
            border: "1px solid #ddd",
            marginBottom: "15px",
            padding: "10px",
            borderRadius: "8px",
          }}
        >
          <p><b>Order ID:</b> {order.id}</p>
          <p><b>Total:</b> ${order.total}</p>
          <p><b>Items:</b> {order.items.length}</p>
        </div>
      ))}
    </div>
  );
}
