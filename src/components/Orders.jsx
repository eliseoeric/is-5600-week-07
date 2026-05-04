import { useState, useEffect } from "react";
import { BASE_URL } from "../config";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = () => {
    fetch(`${BASE_URL}/orders`)
      .then(res => res.json())
      .then(data => setOrders(data))
      .catch(err => console.error("Error fetching orders:", err));
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (!orders.length) {
    return <div>No orders found</div>;
  }

  return (
    <div>
      <h2>Orders</h2>

      {orders.map(order => (
        <div key={order.id} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
          <h3>Order ID: {order.id}</h3>

          {order.items.map(item => (
            <div key={item.id}>
              {item.name} - {item.quantity} × ${item.price}
            </div>
          ))}

          <strong>
            Total: $
            {order.items.reduce(
              (sum, item) => sum + item.price * item.quantity,
              0
            )}
          </strong>
        </div>
      ))}
    </div>
  );
}