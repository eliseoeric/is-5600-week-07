// src/components/Card.js
import React from 'react';

const Card = ({ product }) => {
  return (
    <div className="card">
      {/* Using the external image URL */}
      <img src="https://c8.alamy.com/comp/DMYTR5/mobile-phone-cartoon-DMYTR5.jpg" alt={product.name} width="100" height="100" />
      <h2>{product.name}</h2>
      <p>${product.price}</p>
    </div>
  );
};

export default Card;
