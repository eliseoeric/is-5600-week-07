// src/components/Orders.jsx
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../config";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchOrders() {
      try {
        setLoading(true);
        const res = await fetch(`${BASE_URL}/orders?limit=50&offset=0`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setOrders(Array.isArray(data) ? data : []);
      } catch (e) {
        setError(e.message || "Failed to load orders");
      } finally {
        setLoading(false);
      }
    }
    fetchOrders();
  }, []);

  if (loading) return <div className="pa4 tc">Loading orders…</div>;
  if (error) return <div className="pa4 red tc">Error: {error}</div>;

  return (
    <section className="pa3">
      <h2 className="f3 fw4 mv3 tc">Orders</h2>
      {orders.length === 0 ? (
        <p className="tc gray">No orders yet.</p>
      ) : (
        <div className="mw7 center">
          {orders.map((o) => (
            <article key={o._id} className="pa3 mb3 ba b--black-10 br2">
              <div className="flex justify-between">
                <strong>Order #{o._id}</strong>
                <span className="gray">{o.status}</span>
              </div>
              <div className="mt2">
                <div className="gray">Buyer: {o.buyerEmail}</div>
                <div className="mt2">
                  <span className="b">Items:</span>
                  <ul className="mt2 pl3">
                    {(o.products || []).map((p) => (
                      <li key={typeof p === "string" ? p : p._id}>
                        {typeof p === "string"
                          ? p
                          : `${p.tags?.[0]?.title || "Untitled"} — ${p._id}`}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
