// src/components/Card.jsx
import React from "react";
import { Link } from "react-router-dom";
import OrderButton from "./AddToCart";

export default function Card({ id, name, price, image }) {
  return (
    <div className="ba pa3 br3 mb3 w-100 w-30-ns dib">
      <img
        src={image}
        alt={name}
        className="w-100 mb2"
        style={{ maxHeight: "200px", objectFit: "cover" }}
      />
      <h3 className="f5 mb2">{name}</h3>
      <p className="f6 gray mb2">${price}</p>
      <div className="flex justify-between items-center">
        <Link to={`/product/${id}`} className="f6 link dim ph3 pv2 mb2 dib white bg-blue br2">
          View
        </Link>
        <OrderButton product={{ id, name, price, image }} />
      </div>
    </div>
  );
}
