import { useContext, useEffect } from "react";
import { StoreContext } from "../context/StoreContext";

export default function Orders() {
  const { orders, loadOrders } = useContext(StoreContext);

  useEffect(() => {
    loadOrders();
  }, []);

  return (
    <div>
      <h2>Orders</h2>

      {orders.length === 0 && <p>No orders yet.</p>}

      {orders.map((order) => (
        <div key={order.id} className="ba b--black-20 pa3 mv2 br3">
          <p className="b">Order #{order.id}</p>
          <p>{new Date(order.createdAt).toLocaleString()}</p>

          <ul className="pl3">
            {order.items.map((item, index) => (
              <li key={index}>{item.title}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
