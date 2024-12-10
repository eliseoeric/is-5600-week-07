import React from 'react'
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../App.css';
import AddToCart from './AddToCart';
import { BASE_URL } from '../config';


export default function SingleView({data}) {
  // get the id from the url using useParams
export default function SingleView() {
  // Get the product ID from the URL
  const { id } = useParams();

  // get the product from the data using the id
  const product = data.find(product => product.id === id);

  const { user } = product;
  // State for storing product data
  const [product, setProduct] = useState(null);

  const title = product.description ?? product.alt_description;
  const style = {
    backgroundImage: `url(${product.urls["regular"]})`
  /**
   * Fetch the product by ID from the server.
   * Updates the `product` state with the fetched data.
   */
  const fetchProductById = async (productId) => {
    try {
      const response = await fetch(`${BASE_URL}/products/${productId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch product');
      }
      const data = await response.json();
      setProduct(data);
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };

  // Fetch product when the component mounts or the ID changes
  useEffect(() => {
    fetchProductById(id);
  }, [id]);

  // Show a loading spinner while fetching data
  if (!product) {
    return <div className="loading-spinner">Loading...</div>;
  }

  // Destructure product details
  const { user, description, alt_description, urls, price, likes } = product;
  const title = description ?? alt_description;
  const style = {
    backgroundImage: `url(${urls?.regular})`,
  };

  return (
    <article class="bg-white center mw7 ba b--black-10 mv4">
      <div class="pv2 ph3">
        <div class="flex items-center">
          <img src={user?.profile_image?.medium} class="br-100 h3 w3 dib" alt={user.instagram_username} />
          <h1 class="ml3 f4">{user.first_name} {user.last_name}</h1>
    <article className="bg-white center mw7 ba b--black-10 mv4">
      <div className="pv2 ph3">
        <div className="flex items-center">
          <img
            src={user?.profile_image?.medium}
            className="br-100 h3 w3 dib"
            alt={user?.instagram_username}
          />
          <h1 className="ml3 f4">
            {user?.first_name} {user?.last_name}
          </h1>
        </div>
      </div>
      <div class="aspect-ratio aspect-ratio--4x3">
        <div class="aspect-ratio--object cover" style={style}></div>
      <div className="aspect-ratio aspect-ratio--4x3">
        <div className="aspect-ratio--object cover" style={style}></div>
      </div>
      <div class="pa3 flex justify-between">
        <div class="mw6">
          <h1 class="f6 ttu tracked">Product ID: {id}</h1>
          <a href={`/products/${id}`} class="link dim lh-title">{title}</a>
      <div className="pa3 flex justify-between">
        <div className="mw6">
          <h1 className="f6 ttu tracked">Product ID: {id}</h1>
          <a href={`/products/${id}`} className="link dim lh-title">
            {title}
          </a>
        </div>
        <div className="gray db pv2">
          &hearts;<span>{likes}</span>
        </div>
        <div class="gray db pv2">&hearts;<span>{product.likes}</span></div>
      </div>
      <div className="pa3 flex justify-end">
        <span className="ma2 f4">${product.price}</span>
        {/* TODO Implement the AddToCart button */}
        <span className="ma2 f4">${price}</span>
        <AddToCart product={product} />
      </div>
    </article>

  )
  );
}