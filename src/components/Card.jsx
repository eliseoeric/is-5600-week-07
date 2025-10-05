// src/components/Card.js
import React from "react";
import { Link } from "react-router-dom";

const Card = ({ id, name, description, price, imageUrl }) => {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        padding: "20px",
        margin: "10px",
        borderRadius: "10px",
        width: "200px",
        textAlign: "center",
        display: "inline-block",
        verticalAlign: "top",
      }}
    >
      <img
        src={imageUrl || "https://via.placeholder.com/150"}
        alt={name}
        style={{ width: "100%", borderRadius: "5px" }}
      />
      <h3>{name}</h3>
      <p>${price}</p>
      <Link to={`/product/${id}`}>View</Link>
    </div>
  );
};

export default Card;
