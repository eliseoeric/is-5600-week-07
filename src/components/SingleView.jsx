import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../App.css';
import { BASE_URL } from '../config';
import AddToCart from './AddToCart';

export default function SingleView() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  const fetchProductById = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/products/${id}`);
      if (!response.ok) throw new Error('Failed to fetch product');
      return await response.json();
    } catch (error) {
      console.error('Error fetching product:', error);
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

  if (!product) return <div className="loading-spinner"></div>;

  return (
    <article className="pa3 mw7 center bg-white ba b--black-10">
      <h2 className="f2">{product.name}</h2>
      <img src={product.image} alt={product.name} className="db w-100 br2" />
      <p className="lh-copy">{product.description}</p>
      <p className="f6 gray">Seller: {product?.user?.name || 'Unknown'}</p>
      <div className="pa3 flex justify-end">
        <span className="ma2 f4">${product.price}</span>
        <AddToCart product={product} />
      </div>
    </article>
  );
}

