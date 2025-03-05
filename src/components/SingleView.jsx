// src/components/SingleView.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const SingleView = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/products/${id}`)
      .then(response => response.json())
      .then(data => setProduct(data))
      .catch(error => console.error('Error fetching product:', error));
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div>
      <h1>{product.name}</h1>
      {/* Replacing product.imageUrl with the provided image URL */}
      <img src="https://iheartcraftythings.com/wp-content/uploads/2022/01/Preview-80.jpg" alt={product.name} width="200" height="200" />
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
    </div>
  );
};

export default SingleView;
