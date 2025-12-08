import React, { useEffect, useState } from "react";
import { BASE_URL } from "../config";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  // Fetch all orders from the backend
  const fetchOrders = async () => {
    try {
      const res = await fetch(`${BASE_URL}/orders`);
      const data = await res.json();
      setOrders(data);
    } catch (error) {
      console.error("Failed to load orders:", error);
    }
  };

  // Load orders when component loads
  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="pa4">
      <h2>Your Orders</h2>

      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        orders.map((order) => (
          <div key={order.id} className="ba pa3 mv3">
            <p><strong>Order ID:</strong> {order.id}</p>
            <p><strong>Total:</strong> ${order.total}</p>

            {/* Show the items inside the order */}
            {order.items && (
              <ul>
                {order.items.map((item) => (
                  <li key={item.id}>
                    {item.title} — {item.quantity} × ${item.price}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))
      )}
    </div>
  );
}
