import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../App.css';
import { BASE_URL } from '../config';
import AddToCart from './AddToCart';

export default function SingleView() {
  // Get the id from the URL using useParams
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProductById = async () => {
      try {
        const response = await fetch(`${BASE_URL}/products/${id}`);
        if (!response.ok) throw new Error('Failed to fetch product');
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProductById();
  }, [id]);

  // Show a loading state while the product is being fetched
  if (!product) return <div className="loading-spinner"></div>;

  const user = product?.user || {};
  const title = product.description ?? product.alt_description;
  const style = {
    backgroundImage: `url(${product?.urls?.regular})`
  };

  return (
    <article className="bg-white center mw7 ba b--black-10 mv4">
      <div className="pv2 ph3">
        <div className="flex items-center">
          {user.profile_image && (
            <img src={user.profile_image.medium} className="br-100 h3 w3 dib" alt={user.instagram_username || "User"} />
          )}
          <h1 className="ml3 f4">{user.first_name} {user.last_name}</h1>
        </div>
      </div>

      {product.urls?.regular && (
        <div className="aspect-ratio aspect-ratio--4x3">
          <div className="aspect-ratio--object cover" style={style}></div>
        </div>
      )}

      <div className="pa3 flex justify-between">
        <div className="mw6">
          <h1 className="f6 ttu tracked">Product ID: {id}</h1>
          <a href={`/products/${id}`} className="link dim lh-title">{title}</a>
        </div>
        <div className="gray db pv2">&hearts; <span>{product.likes}</span></div>
      </div>

      <div className="pa3 mw7 center bg-white ba b--black-10">
        <h2 className="f2">{product.name}</h2>
        {product.image && <img src={product.image} alt={product.name} className="db w-100 br2" />}
        <p className="lh-copy">{product.description}</p>
        <p className="f6 gray">Seller: {user.name || 'Unknown'}</p>
        <div className="pa3 flex justify-end">
          <span className="ma2 f4">${product.price}</span>
          <AddToCart product={product} />
        </div>
      </div>
    </article>
  );
}
