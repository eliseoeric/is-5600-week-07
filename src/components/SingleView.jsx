import React, { useState, useEffect } from "react";
import { BASE_URL } from "../config";
import { useParams } from "react-router-dom";
import AddToCart from "./AddToCart";

export default function SingleView() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  // Fetch a single product by its ID
  const fetchProductById = async () => {
    const res = await fetch(`${BASE_URL}/products/${id}`);
    const data = await res.json();
    setProduct(data);
  };

  // Load product when ID changes
  useEffect(() => {
    fetchProductById();
  }, [id]);

  // While loading
  if (!product) return <div>Loading...</div>;

  // Final render
  return (
    <div className="pa4">
      <h1>{product.title}</h1>

      <img
        src={product.image}
        alt={product.title}
        width="300"
        className="db mv3"
      />

      <p>{product.description}</p>
      <h3>${product.price}</h3>

      {/* Add to Cart Button */}
      <AddToCart product={product} />
    </div>
  );
}
