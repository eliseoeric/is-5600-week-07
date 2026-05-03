import React, { useEffect } from 'react'
import { useStore } from '../state/StoreProvider'

const Orders = () => {
  const { orders, loading, error, fetchOrders } = useStore()

  useEffect(() => {
    fetchOrders()
  }, [fetchOrders])


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
            {orders.map((order) => (
              <tr key={order._id}>
                <td className="tl pv2">{order._id}</td>
                <td className="tl pv2">{order.buyerEmail}</td>
                <td className="tl pv2">
                  {(order.products || [])
                    .map((product) =>
                      typeof product === 'string'
                        ? product
                        : product.description || product.alt_description || product._id
                    )
                    .join(', ')}
                </td>
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