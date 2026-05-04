import React, { useEffect, useState } from "react";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/orders")
      .then((res) => res.json())
      .then((data) => setOrders(data));
  }, []);

  return (
    <div>
      <h2>Orders</h2>
      {orders.map((order, i) => (
        <div key={i}>
          <p>Order #{i + 1}</p>
          {order.items.map((item, j) => (
            <p key={j}>- {item.name}</p>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Orders;