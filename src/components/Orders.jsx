import React, { useEffect, useState } from "react";
import { BASE_URL } from "../config";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = () => {
    fetch(`${BASE_URL}/orders`)
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) return <div className="pa4 tc">Loading...</div>;

  if (!orders || orders.length === 0)
    return <div className="pa4 tc">No orders yet.</div>;

  return (
    <div className="pa4">
      <h2 className="f2 mb3">Orders</h2>

      {orders.map((order) => (
        <div key={order.id} className="ba b--black-10 pa3 mb3 br2">
          <h3 className="f4 mb2">Order #{order.id}</h3>

          <p className="mb2">
            <strong>Total:</strong> ${Number(order.total).toFixed(2)}
          </p>

          <ul className="ml0 pl3">
            {order.items.map((item) => (
              <li key={item.id}>
                {item.title || item.name} x {item.quantity} @ ${item.price}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
