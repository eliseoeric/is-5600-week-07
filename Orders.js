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
    <div className="pa4">
      <h2>Orders</h2>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        orders.map((order) => (
          <div key={order.id} className="mb3">
            <p>
              <strong>Order ID:</strong> {order.id}
            </p>
            <p>
              <strong>Total:</strong> ${order.total}
            </p>
          </div>
        ))
      )}
    </div>
  );
}