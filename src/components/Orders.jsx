import React, { useEffect, useState } from "react";
import { BASE_URL } from "../config";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = () => {
    fetch(`${BASE_URL}/orders`)
      .then(res => res.json())
      .then(data => setOrders(data));
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="pa4">
      <h2>Orders</h2>

      {orders.map(order => (
        <div key={order._id} className="ba pa2 mb2">
          <p>Email: {order.buyerEmail}</p>
          <p>Products: {order.products.join(", ")}</p>
        </div>
      ))}
    </div>
  );
};

export default Orders;
