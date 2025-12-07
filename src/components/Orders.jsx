import React, { useEffect, useState } from "react";
import { BASE_URL } from "../config";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    const data = await fetch(`${BASE_URL}/orders`).then((res) => res.json());
    setOrders(data);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="pa4">
      <h2>Your Orders</h2>

      {orders.length === 0 && <p>No orders yet.</p>}

      {orders.map((order) => (
        <div key={order._id} className="ba br2 pa3 ma2">
          <p>Order ID: {order._id}</p>
          <p>Status: {order.status}</p>
        </div>
      ))}
    </div>
  );
}
