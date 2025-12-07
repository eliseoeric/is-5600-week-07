import React, { useState, useEffect } from 'react';
import { BASE_URL } from '../config';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedOrder, setExpandedOrder] = useState(null);

  // Function to fetch orders from the API
  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/orders`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch orders');
      }
      
      const data = await response.json();
      setOrders(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching orders:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Use useEffect to fetch orders when component mounts
  useEffect(() => {
    fetchOrders();
  }, []);

  // Toggle order details expansion
  const toggleOrderDetails = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Show loading spinner while fetching
  if (loading) {
    return (
      <div className="center mw7 mv4 tc pa4">
        <div className="loading-spinner"></div>
        <p className="gray f5 mt3">Loading orders...</p>
      </div>
    );
  }

  // Show error message if fetch failed
  if (error) {
    return (
      <div className="center mw7 mv4 tc pa4 bg-white ba b--light-red">
        <p className="red f5 mb3">⚠️ Error: {error}</p>
        <button 
          onClick={fetchOrders}
          className="f6 link dim br3 ph3 pv2 mb2 dib white bg-blue bn pointer"
        >
          🔄 Retry
        </button>
      </div>
    );
  }

  return (
    <div className="center mw8 mv4 pa3">
      <div className="bg-white pa4 br3 shadow-4">
        <div className="flex items-center justify-between mb4 bb b--light-gray pb3">
          <h1 className="f2 ma0">📦 My Orders</h1>
          <span className="f5 gray">{orders.length} order{orders.length !== 1 ? 's' : ''}</span>
        </div>

        {orders && orders.length > 0 ? (
          <div className="order-list">
            {orders.map((order, index) => (
              <div 
                key={order._id} 
                className="mb3 ba b--light-gray br3 overflow-hidden hover-bg-light-gray transition"
              >
                {/* Order Header */}
                <div 
                  className="pa3 flex items-center justify-between pointer bg-white hover-bg-near-white"
                  onClick={() => toggleOrderDetails(order._id)}
                >
                  <div className="flex-auto">
                    <div className="flex items-center mb2">
                      <span className="f6 b mr3">Order #{index + 1}</span>
                      <span className={`pa2 br2 f7 fw6 ${
                        order.status === 'COMPLETED' ? 'bg-light-green green' : 
                        order.status === 'PENDING' ? 'bg-light-yellow gold' : 
                        order.status === 'CANCELLED' ? 'bg-light-red red' :
                        'bg-light-gray gray'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                    <div className="f6 gray">
                      <span className="mr3">📧 {order.buyerEmail}</span>
                      <span>📅 {formatDate(order.createdAt)}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <span className="f5 b mr3">
                      {Array.isArray(order.products) ? order.products.length : 0} item{order.products?.length !== 1 ? 's' : ''}
                    </span>
                    <span className="f4">
                      {expandedOrder === order._id ? '▲' : '▼'}
                    </span>
                  </div>
                </div>

                {/* Order Details (Expandable) */}
                {expandedOrder === order._id && (
                  <div className="pa3 bt b--light-gray bg-near-white">
                    <h3 className="f5 mb3 mt0">📋 Order Details</h3>
                    
                    <div className="mb3">
                      <p className="f6 mb2"><strong>Order ID:</strong></p>
                      <code className="f7 pa2 bg-white br2 ba b--light-gray db overflow-x-auto">
                        {order._id}
                      </code>
                    </div>

                    <div className="mb3">
                      <p className="f6 mb2"><strong>Products:</strong></p>
                      {Array.isArray(order.products) && order.products.length > 0 ? (
                        <ul className="list pl0 ma0">
                          {order.products.map((productId, idx) => (
                            <li key={idx} className="pa2 mb2 bg-white br2 ba b--light-gray">
                              <code className="f7">{productId}</code>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="gray f6 i">No products in this order</p>
                      )}
                    </div>

                    <div className="mb3">
                      <p className="f6 mb1"><strong>Buyer Email:</strong></p>
                      <p className="f6 ma0 blue">{order.buyerEmail}</p>
                    </div>

                    <div className="mb3">
                      <p className="f6 mb1"><strong>Status:</strong></p>
                      <span className={`pa2 br2 f6 fw6 ${
                        order.status === 'COMPLETED' ? 'bg-light-green green' : 
                        order.status === 'PENDING' ? 'bg-light-yellow gold' : 
                        order.status === 'CANCELLED' ? 'bg-light-red red' :
                        'bg-light-gray gray'
                      }`}>
                        {order.status}
                      </span>
                    </div>

                    {order.createdAt && (
                      <div className="mb3">
                        <p className="f6 mb1"><strong>Order Date:</strong></p>
                        <p className="f6 ma0 gray">{formatDate(order.createdAt)}</p>
                      </div>
                    )}

                    {order.updatedAt && order.updatedAt !== order.createdAt && (
                      <div>
                        <p className="f6 mb1"><strong>Last Updated:</strong></p>
                        <p className="f6 ma0 gray">{formatDate(order.updatedAt)}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="pa5 tc">
            <div className="f1 mb3">📭</div>
            <p className="f4 gray mb3">No orders found</p>
            <p className="f6 gray mb4">Start shopping to create your first order!</p>
            <a 
              href="/" 
              className="f6 link dim br3 ph3 pv2 dib white bg-blue bn pointer"
            >
              🛍️ Start Shopping
            </a>
          </div>
        )}
      </div>

      {orders && orders.length > 0 && (
        <div className="mt3 tc">
          <button 
            onClick={fetchOrders}
            className="f6 link dim br3 ph3 pv2 dib black ba b--black bg-white pointer"
          >
            🔄 Refresh Orders
          </button>
        </div>
      )}
    </div>
  );
};

export default Orders;