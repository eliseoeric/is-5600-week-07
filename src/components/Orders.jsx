import React, { useEffect, useState } from "react";
import { BASE_URL } from "../config";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}/orders`)
      .then((res) => res.json())
      .then((data) => setOrders(Array.isArray(data) ? data : []));
  }, []);

  if (!orders.length) {
    return <div className="center mw7 ba mv4 pa3">No orders yet.</div>;
  }

  return (
    <div className="center mw7 ba mv4">
      <div className="bg-white pa3 mb3">
        <h2 className="f2 mb2">Orders</h2>
        {orders.map((o) => (
          <div key={o.id || o._id || o.createdAt} className="pa2 mb2 ba b--black-10 br2">
            <div className="flex justify-between">
              <div className="fw6">Order #{o.id || o._id || "N/A"}</div>
              <div className="fw6">${Number(o.total || 0).toFixed(2)}</div>
            </div>
            <div className="gray">
              {o.createdAt ? new Date(o.createdAt).toLocaleString() : ""}
            </div>
            <div className="mt2">
              {(o.items || []).map((it) => (
                <div key={(it.id || it._id) + String(it.title)} className="flex justify-between pv1">
                  <span>{it.title} × {it.quantity}</span>
                  <span>${(Number(it.price) * Number(it.quantity)).toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
