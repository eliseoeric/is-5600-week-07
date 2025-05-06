const Orders = ({ orders }) => {
  return (
    <div className="mt4">
      <h2 className="f3">Orders</h2>
      {orders.map((order) => (
        <div key={order.id} className="ba b--black-10 pa2 mv2">
          <p className="b">Order #{order.id}</p>
          <ul>
            {order.items.map((item, i) => (
              <li key={i}>
                {item.name} - ${item.price}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Orders;
