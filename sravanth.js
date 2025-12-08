// src/components/SingleView.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { BASE_URL } from '../config';
import AddToCart from './AddToCart';

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

  if (!product) {
    return <div className="pa4 tc">Loading…</div>;
  }

  return (
    <div className="pa4">
      {/* whatever layout you already had */}
      <h1 className="f2">{product.description}</h1>
      <p>${product.price}</p>

      {/* Add To Cart button */}
      <AddToCart product={product} />
    </div>
  );
}
