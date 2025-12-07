import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../config";
import AddToCart from "./AddToCart";

export default function SingleView() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  const fetchProductById = async (id) => {
    const data = await fetch(`${BASE_URL}/products/${id}`).then((res) =>
      res.json()
    );
    return data;
  };

  useEffect(() => {
    fetchProductById(id).then(setProduct);
  }, [id]);

  if (!product) return <div className="pa4">Loading...</div>;

  return (
    <div className="pa4">
      <h2>{product.title}</h2>
      <p>${product.price}</p>

      <AddToCart product={product} />
    </div>
  );
}
