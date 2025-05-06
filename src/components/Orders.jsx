import React, { useEffect, useState } from "react";
import { BASE_URL } from "../config";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}/orders`)
      .then(res => res.json())
      .then(setOrders)
      .catch(console.error);
  }, []);

  return (
    <div className="pa3">
      <h2>Your Orders</h2>
      {orders.length === 0 ? <p>No orders yet.</p> : (
        <ul>
          {orders.map(order => (
            <li key={order._id}>{order.buyerEmail} - {order.products.length} items - {order.status}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrderHistory;