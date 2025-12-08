import { useContext, useEffect } from "react";
import { ProductContext } from "../context/ProductContext";

export default function Orders() {
  const { orders, setOrders } = useContext(ProductContext);

  useEffect(() => {
    fetch("http://localhost:3001/orders")
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h2>Orders</h2>

      {orders.map((order) => (
        <div
          key={order.id}
          style={{ border: "1px solid black", margin: 10, padding: 10 }}
        >
          <p>Order ID: {order.id}</p>

          {order.items.map((i, index) => (
            <p key={index}>
              {i.name} - ${i.price}
            </p>
          ))}
        </div>
      ))}
    </div>
  );
}
