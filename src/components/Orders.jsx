import React, { useState, useEffect } from 'react';
import { BASE_URL } from '../config';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`${BASE_URL}/orders`);
        const data = await response.json();
        setOrders(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setLoading(false);
      }
    };
    
    fetchOrders();
  }, []);

  if (loading) {
    return <div className="tc pa4">Loading orders...</div>;
  }

  return (
    <div className="pa3">
      <h2 className="f3 tc">Your Orders</h2>
      {orders.length === 0 ? (
        <p className="tc gray">No orders yet. Add items to cart and checkout!</p>
      ) : (
        orders.map((order, index) => (
          <div key={order.id || index} className="ba b--black-10 br2 ma2 pa3 shadow-2">
            <div className="flex justify-between bb b--black-10 pb2 mb2">
              <div className="f5 b">Order #{order.id || index + 1}</div>
              <div className="gray">{new Date(order.createdAt || order.orderDate).toLocaleDateString()}</div>
            </div>
            {order.items.map((item, i) => (
              <div key={i} className="flex justify-between pa2">
                <span>{item.name} x{item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="flex justify-between pt2 bt b--black-10 mt2">
              <span className="b">Total</span>
              <span className="b green">${order.total.toFixed(2)}</span>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Orders;