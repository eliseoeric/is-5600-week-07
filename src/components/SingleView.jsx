import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../state/CartProvider';
import { BASE_URL } from '../config';

const SingleView = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await fetch(`${BASE_URL}/products/${id}`);
      const data = await response.json();
      setProduct(data);
    };

    fetchProduct();
  }, [id]);

  if (!product) return <div>Loading...</div>;

  const { title, price, description } = product;

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <article className="bg-white center mw7 ba b--black-10 mv4">
      <h1>{title}</h1>
      <p>{description}</p>
      <p>${price}</p>
      <button onClick={handleAddToCart}>Add to Cart</button>
    </article>
  );
};

export default SingleView;
