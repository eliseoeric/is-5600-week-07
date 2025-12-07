// src/components/Orders.jsx

import React, { useState, useEffect } from 'react';
import { BASE_URL } from '../config';

export default function Orders() {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchOrders = async () => {
        try {
            // Fetch from the new /orders endpoint
            const response = await fetch(`${BASE_URL}/orders`);
            const data = await response.json();
            setOrders(data);
        } catch (error) {
            console.error("Error fetching orders:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    if (isLoading) return <div className="loading-spinner">Loading Orders...</div>;
    if (orders.length === 0) return <h2 className="tc pa4">No Orders Found.</h2>;

    return (
        <div className="mw7 center pa4">
            <h1 className="f2 tc">Your Past Orders</h1>
            {orders.map(order => (
                <div key={order._id} className="bg-white ba b--black-10 mv3 pa3">
                    <h3 className="f4">Order ID: {order._id}</h3>
                    <p className="f6 gray">Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                    
                    <h4 className="f5 mt3">Items Purchased:</h4>
                    <ul>
                        {order.items.map((item, index) => (
                            <li key={index} className="f6 lh-copy">
                                {item.title || 'Product'} (x{item.quantity}) - Price: ${item.price?.toFixed(2) || 'N/A'}
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}