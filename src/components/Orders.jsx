import React, { useState } from 'react';
import { BASE_URL } from '../config';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  /**
   * TODO
   * 1. Create a `fetchOrders` function that retrieves all orders from the database
   * 2. Using the `useEffect` hook, update the existing `orders` state object when `fetchOrders` is complete
   **/ 


  return (
    <div className="center mw7 ba mv4">
      <div className="bg-white pa3 mb3">
        <h2 className="f2 mb2">Orders</h2>
        <table className="w-100">
          <thead>
            <tr>
              <th className="tl pv2">Order ID</th>
              <th className="tl pv2">Buyer Email</th>
              <th className="tl pv2">Products</th>
              <th className="tl pv2">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders && orders.map((order) => (
              <tr key={order._id}>
                <td className="tl pv2">{order._id}</td>
                <td className="tl pv2">{order.buyerEmail}</td>
                <td className="tl pv2">{order.products.join(', ')}</td>
                <td className="tl pv2">{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
import React, { useEffect, useState } from "react";

const Orders = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch("https://your-node-api-url/orders");
                const data = await response.json();
                setOrders(data);
            } catch (error) {
                console.error("Error fetching orders:", error);
            }
        };

        fetchOrders();
    }, []);

    return (
        <div>
            <h2>Orders</h2>
            <ul>
                {orders.map(order => (
                    <li key={order.id}>
                        Order #{order.id} - {order.total} USD
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Orders;
