import React from 'react';
import { useStore } from '../state/StoreContext';

const Orders = () => {
  const { orders, loading, error } = useStore();

  const renderProducts = (products) => {
    if (!products) return '';
    return products
      .map((product) => {
        if (typeof product === 'string') {
          return product;
        }
        return product.description || product.alt_description || product._id;
      })
      .join(', ');
  };

  return (
    <div className="center mw7 ba mv4">
      <div className="bg-white pa3 mb3">
        <h2 className="f2 mb2">Orders</h2>
        {loading.orders && <p className="mv3">Loading order history...</p>}
        {error && <p className="mv3 red">{error}</p>}
        {!loading.orders && orders.length === 0 && <p className="mv3">No orders yet.</p>}
        <table className="w-100 collapse">
          <thead>
            <tr>
              <th className="tl pv2">Order ID</th>
              <th className="tl pv2">Buyer Email</th>
              <th className="tl pv2">Products</th>
              <th className="tl pv2">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td className="tl pv2">{order._id}</td>
                <td className="tl pv2">{order.buyerEmail}</td>
                <td className="tl pv2">{renderProducts(order.products)}</td>
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