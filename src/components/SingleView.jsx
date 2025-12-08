import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../config";
import AddToCart from "./AddToCart";

export default function SingleView() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  const fetchProductById = async (id) => {
    return fetch(`${BASE_URL}/products/${id}`).then((res) => res.json());
  };

  useEffect(() => {
    const load = async () => {
      const data = await fetchProductById(id);
      setProduct(data);
    };
    load();
  }, [id]);

  if (!product) return <div>Loading...</div>;

  return (
    <div className="pa4">
      <img src={product.image_url} alt={product.title} width="400" />
      <h2>{product.title}</h2>
      <p>{product.description}</p>
      <AddToCart product={product} />
    </div>
  );
}
