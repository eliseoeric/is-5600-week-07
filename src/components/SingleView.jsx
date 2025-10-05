import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AddToCart from "./AddToCart";
import { BASE_URL } from "../config";
import "../App.css";

export default function SingleView() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  const fetchProductById = async (id) => {
    try {
      const res = await fetch(`${BASE_URL}/products/${id}`);
      if (!res.ok) throw new Error(`Failed to fetch product ${id}`);
      const data = await res.json();
      return data;
    } catch (err) {
      console.error("Error fetching product:", err);
      return null;
    }
  };

  useEffect(() => {
    const getProduct = async () => {
      const data = await fetchProductById(id);
      setProduct(data);
    };
    getProduct();
  }, [id]);

  if (!product) return <div className="pa4">Loading product...</div>;

  return (
    <div className="pa4">
      <h2>{product.name}</h2>
      <img src={product.image} alt={product.name} style={{ maxWidth: "400px" }} />
      <p>{product.description}</p>
      <p>${product.price}</p>
      <AddToCart product={product} />
    </div>
  );
}
