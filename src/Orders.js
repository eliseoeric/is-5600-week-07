import React, { useState, useEffect } from 'react';
import { BASE_URL } from '../config';

const Orders = () => {
  // 1. Initialize state to hold the array of orders
  const [orders, setOrders] = useState([]);

  // 2. Create the fetch function to get orders from the Node API
  const fetchOrders = async () => {
    try {
      const response = await fetch(`${BASE_URL}/orders`);
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  // 3. Trigger fetchOrders once when the component mounts
  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="pa4">
      <h1 className="f3 mb4">Order History</h1>
      
      {orders.length === 0 ? (
        <p className="gray">No orders found.</p>
      ) : (
        <div className="mw8 center">
          {orders.map((order) => (
            <div key={order.id} className="ba b--black-10 br3 pa3 mb3 bg-near-white">
              <div className="flex justify-between items-center border-bottom b--black-10 pb2 mb2">
                <span className="f5 b">Order #{order.id}</span>
                <span className="f6 gray">{new Date(order.createdAt).toLocaleDateString()}</span>
              </div>
              
              <div className="f6">
                <p className="mb1"><strong>Status:</strong> {order.status || 'Processing'}</p>
                <p className="mb1"><strong>Items:</strong> {order.items?.length || 0}</p>
                <p className="f5 b tr mt2">Total: ${order.total}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;