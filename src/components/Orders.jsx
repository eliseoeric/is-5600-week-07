import React, { useState, useEffect } from 'react';
import { BASE_URL } from '../config';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = () => {
    fetch(`${BASE_URL}/orders`)
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
      });
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (orders.length === 0) {
    return (
      <div className="pa4 tc">
        <h2>No orders yet</h2>
      </div>
    );
  }

  return (
    <div className="pa4">
      <h2 className="f2 mb4">Your Orders</h2>
      {orders.map((order) => {
        const productCounts = (order.products || []).reduce((acc, product) => {
          const id = typeof product === 'string' ? product : product._id;
          if (!acc[id]) {
            acc[id] = { item: product, quantity: 0 };
          }
          acc[id].quantity += 1;
          return acc;
        }, {});

        return (
          <div key={order._id} className="ba b--light-gray pa3 mb3 br2">
            <div className="flex justify-between items-center mb2">
              <p className="f5 fw6 ma0">Order #{order._id}</p>
              <p className="f6 gray ma0">{order.createdAt ? new Date(order.createdAt).toLocaleDateString() : ''}</p>
            </div>
            {Object.values(productCounts).map(({ item, quantity }, index) => {
              const product = typeof item === 'string' ? { _id: item, description: 'Product', price: 0 } : item;
              return (
                <div key={index} className="flex items-center pv2 bb b--light-gray">
                  {product.img && <img src={product.img} alt={product.description} className="w2 h2 mr2" />}
                  <p className="f6 ma0 flex-auto">{product.description || product._id}</p>
                  <p className="f6 ma0 mr3">Qty: {quantity}</p>
                  <p className="f6 fw6 ma0">${((product.price || 0) * quantity).toFixed(2)}</p>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Orders;