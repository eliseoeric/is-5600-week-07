import { useState, useEffect } from "react";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    loadOrders();
  }, []);

  async function loadOrders() {
    const res = await fetch(
      "https://congenial-giggle-pj975qpjwgpxfrpr9-4000.app.github.dev/orders"
    );
    const json = await res.json();
    setOrders(json);
  }

  return (
    <div>
      {orders.length === 0 ? (
        <div>No orders yet.</div>
      ) : (
        orders.map((o) => (
          <div
            key={o.id}
            style={{border:"1px solid #ddd", padding:"10px", margin:"8px 0"}}
          >
            <h4>Order #{o.id}</h4>
            <p>Items: {o.items.length}</p>
          </div>
        ))
      )}
    </div>
  );
}
