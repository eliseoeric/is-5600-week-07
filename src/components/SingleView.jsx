import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../config";
import AddToCart from "./AddToCart";

export default function SingleView() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  const fetchProductById = async (id) => {
    const product = await fetch(`${BASE_URL}/products/${id}`)
      .then((res) => res.json());
    return product;
  };

  useEffect(() => {
    const getProduct = async () => {
      const data = await fetchProductById(id);
      setProduct(data);
    };
    getProduct();
  }, [id]);

  if (!product) return (<div className="loading-spinner">Loading...</div>);

  return (
    <div className="pa3">
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>${product.price}</p>

      {/* Add to Cart button */}
      <AddToCart product={product} />
    </div>
  );
}
