import { useEffect, useState } from "react";
import { BASE_URL } from "../config";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}/orders`)
      .then((res) => res.json())
      .then((data) => setOrders(data));
  }, []);

  return (
    <div className="pa4">
      <h1>Orders</h1>

      {orders.length === 0 && <p>No orders found.</p>}

      {orders.map((order) => (
        <div key={order._id} className="ba b--black-20 pa3 mb3">
          <h3>Order ID: {order._id}</h3>
          <p>Email: {order.buyerEmail}</p>
          <p>Status: {order.status}</p>
          <p>Products: {order.products?.length}</p>
        </div>
      ))}
    </div>
  );
}