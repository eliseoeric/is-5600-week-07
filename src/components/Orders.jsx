// Orders.jsx

import React, { useState, useEffect } from "react";
import { BASE_URL } from "../config";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const res = await fetch(`${BASE_URL}/orders`);
      if (!res.ok) {
        throw new Error(`Failed to fetch orders: ${res.status}`);
      }
      const data = await res.json();
      setOrders(data);
    } catch (err) {
      console.error("Error fetching orders:", err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="pa4">
      <h2>Your Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order) => (
          <div key={order.id} className="ba pa3 mb3">
            <p><strong>Order ID:</strong> {order.id}</p>
            <p><strong>Total:</strong> ${order.total}</p>
            {order.items && (
              <div>
                <p><strong>Items:</strong></p>
                <ul>
                  {order.items.map((it) => (
                    <li key={it.id}>
                      {it.name} — {it.quantity} × ${it.price}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default Orders;
