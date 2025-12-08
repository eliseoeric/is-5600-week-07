// src/components/Card.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function Card(props) {
  const { _id, description, price, urls } = props;
  return (
    <div style={{ border: "1px solid #eee", borderRadius: 8, padding: 12, background: "#fff" }}>
      <div style={{ height: 160, marginBottom: 8, backgroundSize: "cover", backgroundPosition: "center", backgroundImage: `url(${(urls && urls.small) || ""})` }} />
      <h4 style={{ margin: "6px 0" }}>{description || "Untitled product"}</h4>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontWeight: 700 }}>${price ?? "0.00"}</div>
        <Link to={`/product/${_id}`} style={{ textDecoration: "none" }}>View</Link>
      </div>
    </div>
  );
}
