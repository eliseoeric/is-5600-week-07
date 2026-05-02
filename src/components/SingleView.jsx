import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AddToCart from './AddToCart';
import { BASE_URL } from '../config';

export default function SingleView() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProductById = async (productId) => {
    try {
      const response = await fetch(`${BASE_URL}/products/${productId}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching product:', error);
      return null;
    }
  };

  useEffect(() => {
    const getProduct = async () => {
      setLoading(true);
      const data = await fetchProductById(id);
      setProduct(data);
      setLoading(false);
    };
    getProduct();
  }, [id]);

  if (loading) {
    return <div className="loading-spinner tc pa4">Loading product details...</div>;
  }

  if (!product) {
    return <div className="tc pa4 red">Product not found</div>;
  }

  return (
    <div className="pa4">
      <div className="flex flex-wrap">
        <div className="w-100 w-50-ns pa3">
          <img 
            src={`https://via.placeholder.com/400x400?text=${product.name}`} 
            alt={product.name}
            className="w-100"
          />
        </div>
        <div className="w-100 w-50-ns pa3">
          <h1 className="f1">{product.name}</h1>
          <p className="f4 gray">{product.description}</p>
          <p className="f2 green">${product.price}</p>
          <AddToCart product={product} />
        </div>
      </div>
    </div>
  );
}