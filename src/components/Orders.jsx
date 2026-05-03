import React, { useEffect, useState } from "react";
import { BASE_URL } from "../config";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}/orders`)
      .then(res => res.json())
      .then(data => setOrders(data));
  }, []);

  return (
    <div>
      <h2>Orders</h2>

      {orders.map(order => (
        <div key={order._id}>
          <p>Email: {order.buyerEmail}</p>
          <p>Status: {order.status}</p>
          <p>Products: {order.products.length}</p>
        </div>
      ))}
    </div>
  );
}