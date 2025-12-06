import React, { useState, useEffect } from 'react';
import { BASE_URL } from '../config';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const res = await fetch(`${BASE_URL}/orders`);
      const data = await res.json();
      setOrders(Array.isArray(data) ? data : []); 
      console.log('Orders fetched:', data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="center mw7 mv4">
      <div className="bg-blue-lightest pa4 br3 shadow-2">
        <h2 className="f2 mb3" style={{ color: '#60a5fa' }}>Orders</h2>

        <table
          className="w-100 ba b--blue-lightest"
          style={{ borderColor: '#bfdbfe', tableLayout: 'auto' }}
        >
          <thead className="bg-blue-lighter" style={{ backgroundColor: '#e0f2fe' }}>
            <tr>
              <th className="tl pv2 ph2">Order ID</th>
              <th className="tl pv2 ph2">Buyer Email</th>
              <th className="tl pv2 ph2">Products</th>
              <th className="tl pv2 ph2">Status</th>
            </tr>
          </thead>

          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => {
                if (!order) return null; 
                const orderId = order._id || Math.random();

                return (
                  <tr
                    key={orderId}
                    className="hover-bg-blue-lightest"
                    style={{
                      transition: 'background 0.2s',
                      verticalAlign: 'middle',
                      backgroundColor: '#f0f8ff',
                    }}
                  >
                    <td className="tl pv2 ph2" style={{ whiteSpace: 'normal', wordBreak: 'break-word' }}>
                      {orderId}
                    </td>

                    <td className="tl pv2 ph2">{order.buyerEmail || 'N/A'}</td>

                    <td className="tl pv2 ph2">
                      {order.products && Array.isArray(order.products) && order.products.length > 0 ? (
                        <table className="w-100 ba b--blue-lightest" style={{ borderColor: '#bfdbfe', tableLayout: 'auto' }}>
                          <thead className="bg-blue-lighter" style={{ backgroundColor: '#e0f2fe' }}>
                            <tr>
                              <th className="tl pv1 ph1">Product</th>
                              <th className="tr pv1 ph1">Quantity (pcs)</th>
                              <th className="tr pv1 ph1">Price Paid</th>
                            </tr>
                          </thead>

                          <tbody>
                            {order.products.map((product) => {
                              if (!product) return null;
                              const productId = product._id || product.id || Math.random();
                              const quantity = product.quantity || 0;
                              const price = product.price || 0;

                              return (
                                <tr key={productId}>
                                  <td className="pv1 ph1">
                                    
                                    {product.title || product.description || 'Unnamed Product'}
                                  </td>

                                  <td className="pv1 ph1 tr">{quantity}</td>

                                  <td className="pv1 ph1 tr">${(price * quantity).toFixed(2)}</td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      ) : (
                        <span>No products</span>
                      )}
                    </td>

                    <td className="tl pv2 ph2">{order.status || 'Pending'}</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="4" className="pa3 tc" style={{ color: '#60a5fa' }}>
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
