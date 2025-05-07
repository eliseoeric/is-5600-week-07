// src/components/Card.js
import React from "react";
import { Link } from "react-router-dom";

const Card = ({ product }) => {
  return (
    <div>
      <h3>{product.name}</h3>
      <p>Price: ${product.price}</p>
      <Link to={`/product/${product.id}`}>View Details</Link>
    </div>
  );
};

export default Card;
