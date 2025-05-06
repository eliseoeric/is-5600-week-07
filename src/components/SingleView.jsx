import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../config";
import AddToCart from "./AddToCart";

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`${BASE_URL}/products/${id}`)
      .then(res => res.json())
      .then(setProduct)
      .catch(console.error);
  }, [id]);

  if (!product) return <p className="tc pa3">Loading product...</p>;

  return (
    <div className="pa4">
      <h2>{product.title}</h2>
      <p className="mb3">{product.description}</p>
      <p className="mb2">${product.price}</p>
      <AddToCart product={product} />
    </div>
  );
};

export default ProductPage;
