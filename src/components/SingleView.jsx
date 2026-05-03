import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { BASE_URL } from '../config';
import '../App.css';

export default function SingleView({ onAddToCart }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${BASE_URL}/products/${id}`);
        if (!response.ok) {
          throw new Error(`Failed to load product: ${response.status}`);
        }
        const data = await response.json();
        setProduct(data);
      } catch (fetchError) {
        console.error(fetchError);
        setError('Unable to load product.');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <p className="pa4">Loading product...</p>;
  }

  if (error || !product) {
    return <p className="pa4">{error || 'Product not found.'}</p>;
  }

  const user = product.user || {};
  const title = product.description ?? product.alt_description;
  const style = {
    backgroundImage: `url(${product.urls?.regular})`
  };

  return (
    <article className="bg-white center mw7 ba b--black-10 mv4">
      <div className="pv2 ph3">
        <div className="flex items-center">
          <img src={user?.profile_image?.medium} className="br-100 h3 w3 dib" alt={user?.instagram_username || 'Product user'} />
          <h1 className="ml3 f4">{user.first_name} {user.last_name}</h1>
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
        <div className="gray db pv2">&hearts;<span>{product.likes}</span></div>
      </div>
      <div className="pa3 flex justify-between items-center">
        <span className="ma2 f4">{product.price != null ? `$${product.price}` : 'No price available'}</span>
        {onAddToCart && (
          <button
            type="button"
            className="f6 no-underline black bg-animate hover-bg-black hover-white inline-flex items-center pa2 ba border-box"
            onClick={() => onAddToCart(product)}
          >
            Add to Cart
          </button>
        )}
      </div>
    </article>
  );
}
