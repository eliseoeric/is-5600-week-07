// src/components/Orders.jsx
import React, { useState, useEffect } from 'react';
import { BASE_URL } from '../config';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // YOUR TASK 3: Create fetchOrders function
  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/orders`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch orders');
      }
      
      const data = await response.json();
      setOrders(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // YOUR TASK 3: Use useEffect to fetch orders
  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) {
    return <div className="loading">Loading orders...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="orders-container">
      <h2>Order History</h2>
      
      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        <div className="orders-list">
          {orders.map(order => (
            <div key={order.id || order._id} className="order-card">
              <div className="order-header">
                <h3>Order #{order.id || order._id}</h3>
                <span className="order-date">
                  {new Date(order.createdAt || order.date).toLocaleDateString()}
                </span>
              </div>
              
              <div className="order-items">
                <h4>Items:</h4>
                {order.items && order.items.map((item, index) => (
                  <div key={index} className="order-item">
                    <span>{item.name || `Product ${item.productId}`}</span>
                    <span>Qty: {item.quantity}</span>
                    <span>${item.price?.toFixed(2)} each</span>
                  </div>
                ))}
              </div>
              
              <div className="order-total">
                <strong>Total: ${order.total?.toFixed(2)}</strong>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;