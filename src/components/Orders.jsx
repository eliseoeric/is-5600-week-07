// src/components/Orders.jsx
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../config";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = () => {
    setLoading(true);
    fetch(`${BASE_URL}/orders`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch orders");
        return res.json();
      })
      .then((data) => setOrders(data || []))
      .catch((err) => {
        console.error(err);
        setOrders([]);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div>
      <h2>Orders</h2>
      {loading ? (
        <div>Loading orders...</div>
      ) : orders.length === 0 ? (
        <div>No orders yet</div>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ textAlign: "left", borderBottom: "1px solid #eee" }}>Order ID</th>
              <th style={{ textAlign: "left", borderBottom: "1px solid #eee" }}>Email</th>
              <th style={{ textAlign: "left", borderBottom: "1px solid #eee" }}>Products</th>
              <th style={{ textAlign: "left", borderBottom: "1px solid #eee" }}>Total</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o._id}>
                <td style={{ padding: 8 }}>{o._id}</td>
                <td>{o.buyerEmail}</td>
                <td>{o.products?.map(p => p.productId ? `${p.productId} (x${p.quantity})` : JSON.stringify(p)).join(", ")}</td>
                <td>${(o.total ?? 0).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
