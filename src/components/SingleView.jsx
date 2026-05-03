import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { BASE_URL } from '../config';
import AddToCart from './AddToCart';

export default function SingleView() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  const fetchProductById = useCallback(async (productId) => {
    const data = await fetch(`${BASE_URL}/products/${productId}`)
      .then((res) => res.json());
    return data;
  }, []);

  useEffect(() => {
    const getProduct = async () => {
      const data = await fetchProductById(id);
      setProduct(data);
    };
    getProduct();
  }, [id, fetchProductById]);

  if (!product) return <div className="pa4 tc">Loading...</div>;

  return (
    <div className="fl w-100 pa2">
      <div className="fl w-100 w-50-ns pa2">
        <img src={product.urls?.regular} alt={product.description} className="w-100" />
      </div>
      <div className="fl w-100 w-50-ns pa2">
        <h1 className="f2">{product.description}</h1>
        <p className="f5 gray">By {product.user?.first_name} {product.user?.last_name}</p>
        <p className="f3 near-black">${product.price}</p>
        <AddToCart product={product} />
      </div>
    </div>
  );
}