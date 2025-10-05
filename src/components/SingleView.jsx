// SingleView.jsx

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../config";
import AddToCart from "./AddToCart";

const SingleView = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  const fetchProductById = async (id) => {
    try {
      const res = await fetch(`${BASE_URL}/products/${id}`);
      if (!res.ok) {
        throw new Error(`Failed to fetch product ${id}: ${res.status}`);
      }
      const data = await res.json();
      return data;
    } catch (err) {
      console.error("Error fetching product by id:", err);
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

  if (!product) {
    return <div className="pa4">Loading product...</div>;
  }

  return (
    <div className="pa4">
      <h2>{product.name}</h2>
      <img src={product.image} alt={product.name} style={{ maxWidth: "400px" }} />
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>

      <AddToCart product={product} />
    </div>
  );
};

export default SingleView;
