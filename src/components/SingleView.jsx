import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../App.css';
import { BASE_URL } from '../config';
import AddToCart from './AddToCart'; // Ensure this component exists and is imported correctly

export default function SingleView() {
  // Get the product ID from the URL
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  // Fetch the product by ID from the server
  useEffect(() => {
    const fetchProductById = async () => {
      try {
        const response = await fetch(`${BASE_URL}/products/${id}`);
        if (!response.ok) throw new Error('Failed to fetch product');
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
        setError(error.message);
      }
    };

    fetchProductById();
  }, [id]);

  // Show an error message if the request fails
  if (error) return <div className="error-message">Error: {error}</div>;

  // Show a loading spinner if product is not yet loaded
  if (!product) return <div className="loading-spinner"></div>;

  // Extract and handle user data safely
  const { user = {}, description, alt_description, urls, likes = 0, price } = product;
  const { profile_image, instagram_username, first_name = 'Unknown', last_name = '' } = user;
  const title = description || alt_description || 'No description available';
  const imageUrl = urls?.regular || 'https://via.placeholder.com/400'; // Placeholder for missing images

  return (
    <article className="bg-white center mw7 ba b--black-10 mv4">
      <div className="pv2 ph3">
        <div className="flex items-center">
          {profile_image?.medium ? (
            <img
              src={profile_image.medium}
              className="br-100 h3 w3 dib"
              alt={instagram_username || 'User Profile'}
            />
          ) : (
            <div className="br-100 h3 w3 bg-light-gray flex items-center justify-center">
              <span className="f6">No Image</span>
            </div>
          )}
          <h1 className="ml3 f4">{first_name} {last_name}</h1>
        </div>
      </div>

      <div className="aspect-ratio aspect-ratio--4x3">
        <div
          className="aspect-ratio--object cover"
          style={{ backgroundImage: `url(${imageUrl})` }}
        ></div>
      </div>

      <div className="pa3 flex justify-between">
        <div className="mw6">
          <h1 className="f6 ttu tracked">Product ID: {id}</h1>
          <Link to={`/products/${id}`} className="link dim lh-title">{title}</Link>
        </div>
        <div className="gray db pv2">&hearts; <span>{likes}</span></div>
      </div>

      <div className="pa3 flex justify-end">
        <span className="ma2 f4">${price ?? 'N/A'}</span>
        <AddToCart product={product} />
      </div>
    </article>
  );
}