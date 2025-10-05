// src/components/Card.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function Card({ id, name, price, image }) {
  return (
    <div style={{
      border: "1px solid #ddd",
      borderRadius: 8,
      padding: 12,
      margin: 8,
      width: 220,
      boxSizing: "border-box"
    }}>
      <Link to={`/product/${id}`} style={{ textDecoration: "none", color: "inherit" }}>
        <div style={{ height: 140, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <img src={image} alt={name} style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "contain" }} />
        </div>
        <h3 style={{ fontSize: "1rem", margin: "8px 0" }}>{name}</h3>
        <p style={{ margin: 0 }}>${price}</p>
      </Link>
    </div>
  );
}
