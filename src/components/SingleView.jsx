import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from '../config';
import AddToCart from './AddToCart';

export default function SingleView() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  const fetchProductById = async (id) => {
    const res = await fetch(`${BASE_URL}/products/${id}`);
    return res.json();
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
    <div className="pa4">
      <h1>{product.title}</h1>
      <p>{product.description}</p>
      <p className="b">Price: ${product.price}</p>
      <AddToCart product={product} />
    </div>
  );
}