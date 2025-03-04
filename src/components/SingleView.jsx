import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../App.css';
import AddToCart from './AddToCart';
import { BASE_URL } from '../config';

export default function SingleView() {
  const { id } = useParams(); // Get product ID from URL
  const [product, setProduct] = useState(null); // State for product data

  // Fetch product data by ID
  const fetchProductById = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/products/${id}`);
      const data = await response.json();
      setProduct(data);
    } catch (error) {
      console.error('Failed to fetch product:', error);
    }
  };

  useEffect(() => {
    fetchProductById(id);
  }, [id]);

  // Show loading spinner if no product is fetched yet
  if (!product) return <div className="loading-spinner"></div>;

  const title = product.description ?? product.alt_description;
  const style = {
    backgroundImage: `url(${product.urls?.regular})`,
  };

  return (
    <article className="bg-white center mw7 ba b--black-10 mv4">
      <div className="pa3 flex justify-center" style={style}>
        <h2>{title}</h2>
      </div>
      <div className="pa3 flex justify-end">
        <span className="ma2 f4">${product.price}</span>
        <AddToCart product={product} />
      </div>
    </article>
  );
}
