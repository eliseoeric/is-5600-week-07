import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { BASE_URL } from '../config';
import AddToCart from './AddToCart';
import '../App.css';

export default function SingleView() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  // Fetch product by ID from backend
  useEffect(() => {
    fetch(`${BASE_URL}/products/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data))
      .catch(err => console.error("Failed to fetch product:", err));
  }, [id]);

  if (!product) {
    return <div className="pa3">Loading product...</div>;
  }

  const title = product.description ?? product.alt_description;
  const user = product.user ?? {};
  const style = {
    backgroundImage: `url(${product.urls?.regular || product.imageUrl})`,
  };

  return (
    <article className="bg-white center mw7 ba b--black-10 mv4">
      <div className="pv2 ph3">
        <div className="flex items-center">
          {user.profile_image?.medium && (
            <img
              src={user.profile_image.medium}
              className="br-100 h3 w3 dib"
              alt={user.instagram_username || 'Uploader'}
            />
          )}
          <h1 className="ml3 f4">
            {user.first_name} {user.last_name}
          </h1>
        </div>
      </div>

      <div className="aspect-ratio aspect-ratio--4x3">
        <div className="aspect-ratio--object cover" style={style}></div>
      </div>

      <div className="pa3 flex justify-between">
        <div className="mw6">
          <h1 className="f6 ttu tracked">Product ID: {id}</h1>
          <div className="link dim lh-title">{title}</div>
        </div>
        <div className="gray db pv2">
          &hearts;<span>{product.likes || 0}</span>
        </div>
      </div>

      <div className="pa3 flex justify-end items-center">
        <span className="ma2 f4">${product.price}</span>
        <AddToCart product={product} />
      </div>
    </article>
  );
}