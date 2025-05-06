import React, { useContext } from 'react';
import AppContext from './AppContext';

const Orders = () => {
  const { orders, products } = useContext(AppContext);

  return (
    <div>
      <h2>Orders</h2>
      {orders.map((order) => (
        <div key={order.id}>
          <p>
            Order #{order.id} - ${order.total.toFixed(2)} on{' '}
            {new Date(order.date).toLocaleDateString()}
          </p>
          <ul>
            {order.items.map((item) => {
              const product = products.find((p) => p.id === item.productId);
              return (
                <li key={item.productId}>
                  {product ? product.name : 'Product not found'} x {item.quantity}
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Orders;