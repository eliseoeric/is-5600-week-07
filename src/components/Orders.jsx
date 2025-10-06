import React, { useState, useEffect } from "react";
import { BASE_URL } from "../config";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  // Fetch orders from Node API
  const fetchOrders = async () => {
    try {
      const data = await fetch(`${BASE_URL}/orders`).then((res) => res.json());
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="pa3">
      <h2>Your Orders</h2>
      {orders.length === 0 ? (
        <p>No orders yet</p>
      ) : (
        <ul>
          {orders.map((order) => (
            <li key={order.id} className="mb3">
              <strong>Order #{order.id}</strong> <br />
              Items: {order.items?.length || 0} <br />
              Total: ${order.total}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
