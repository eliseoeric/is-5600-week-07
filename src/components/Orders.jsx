import React, { useState, useEffect } from 'react'
import { BASE_URL } from '../config'

const Orders = () => {
  const [orders, setOrders] = useState([])

  const fetchOrders = () => {
    fetch(`${BASE_URL}/orders`)
      .then((res) => res.json())
      .then((data) => {
        setOrders(data)
      })
      .catch((error) => {
        console.error('Error fetching orders:', error)
      })
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  const showProducts = (products) => {
    if (!products) return ''

    if (Array.isArray(products)) {
      return products
        .map((product) => {
          if (typeof product === 'string') {
            return product
          }

          return product.description || product._id
        })
        .join(', ')
    }

    return products
  }

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
            {orders &&
              orders.map((order) => (
                <tr key={order._id}>
                  <td className="tl pv2">{order._id}</td>
                  <td className="tl pv2">{order.buyerEmail}</td>
                  <td className="tl pv2">{showProducts(order.products)}</td>
                  <td className="tl pv2">{order.status}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Orders