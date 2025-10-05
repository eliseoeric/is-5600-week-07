// src/components/SingleView.js
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../config";
import AddToCart from "./AddToCart.jsx";

export default function SingleView() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  const fetchProductById = async (id) => {
    const res = await fetch(`${BASE_URL}/products/${id}`);
    const data = await res.json();
    return data;
  };

  useEffect(() => {
    const getProduct = async () => {
      const data = await fetchProductById(id);
      setProduct(data);
    };
    getProduct();
  }, [id]);

  if (!product) return <div className="loading-spinner">Loading...</div>;

  return (
    <div style={{ padding: "30px" }}>
      <img
        src={product.imageUrl || "https://via.placeholder.com/300"}
        alt={product.name}
        style={{ width: "300px", borderRadius: "10px" }}
      />
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>${product.price}</p>
      <AddToCart product={product} />
    </div>
  );
}
