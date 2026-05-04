import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../config'

export default function Orders() {
  const [orders, setOrders] = useState([])

  const fetchOrders = async () => {
    const data = await fetch(`${BASE_URL}/orders`)
      .then((res) => res.json())

    setOrders(data)
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  return (
    <div className="pa4">
      <h1>Orders</h1>

      {orders.length === 0 && (
        <p>No orders found.</p>
      )}

      {orders.map((order) => (
        <div
          key={order.id}
          className="ba pa3 mv3"
        >
          <h3>Order #{order.id}</h3>

          <pre>
            {JSON.stringify(order, null, 2)}
          </pre>
        </div>
      ))}
    </div>
  )
}
