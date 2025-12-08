import React, { useState, useEffect } from "react";
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
      <h2>Orders</h2>

      {orders.map((o) => (
        <div className="pa3 ba mv2" key={o.id}>
          <h3>Order #{o.id}</h3>
          <p>Total: ${o.total}</p>
        </div>
      ))}
    </div>
  );
}
