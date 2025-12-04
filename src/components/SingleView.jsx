// src/components/SingleView.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { BASE_URL } from '../config';
import AddToCart from './AddToCart';
import '../index.css';

const SingleView = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  const fetchProductById = async (productId) => {
    try {
      const res = await fetch(`${BASE_URL}/products/${productId}`);
      const data = await res.json();
      return data;
    } catch (error) {
      console.error("Error fetching product:", error);
      return null;
    }
  };

  useEffect(() => {
    const getProduct = async () => {
      const data = await fetchProductById(id);
      setProduct(data);
    }
    getProduct();
  }, [id]);

  if (!product) return (<div className="pa4 tc">Loading...</div>);

  const { user, style, description, alt_description, tags } = product;

  return (
    <article className="bg-white center mw7 ba b--black-10 mv4">
      <div className="pv2 ph3">
        <div className="flex items-center">
          <img src={user.profile_image.medium} className="br-100 h3 w3 dib" alt={user.name} />
          <h1 className="ml3 f4">{user.first_name} {user.last_name}</h1>
        </div>
      </div>
      <div className="aspect-ratio aspect-ratio--4x3">
        <div className="aspect-ratio--object cover" style={style}></div>
      </div>
      <div className="pa3">
        <div className="tc">
          <AddToCart product={product} />
        </div>
        <p className="f4 b db black-70">{description || alt_description}</p>
        <p className="f6 lh-copy gray mv2">{alt_description}</p>
        <div className="mt3">
          {tags.map((tag, i) => (
             <span key={i} className="f6 link dim br-pill ph3 pv2 mb2 dib white bg-light-purple mr2">
               {tag}
             </span>
          ))}
        </div>
      </div>
    </article>
  );
}

export default SingleView;
