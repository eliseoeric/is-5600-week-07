import React from 'react'
// SingleView.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { BASE_URL } from '../config';
import AddToCart from './AddToCart';
import '../App.css';


export default function SingleView({data}) {
  // get the id from the url using useParams
export default function SingleView() {
  const { id } = useParams();
  

  // get the product from the data using the id
  const product = data.find(product => product.id === id);
  const [product, setProduct] = useState(null);

  const { user } = product;
  const fetchProductById = async (id) => {
    const response = await fetch(`${BASE_URL}/products/${id}`);
    const data = await response.json();
    return data;
  };

  useEffect(() => {
    const getProduct = async () => {
      const data = await fetchProductById(id);
      setProduct(data);
    };
    getProduct();
  }, [id]);

  if (!product) return <div className="loading-spinner"></div>;

  const { user } = product;
  const title = product.description ?? product.alt_description;
  const style = {
    backgroundImage: `url(${product.urls["regular"]})`
  }
    backgroundImage: `url(${product.urls.regular})`,
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
          <img src={user?.profile_image?.medium} className="br-100 h3 w3 dib" alt={user.instagram_username} />
          <h1 className="ml3 f4">{user.first_name} {user.last_name}</h1>
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
          <a href={`/products/${id}`} className="link dim lh-title">{title}</a>
        </div>
        <div class="gray db pv2">&hearts;<span>{product.likes}</span></div>
        <div className="gray db pv2">&hearts;<span>{product.likes}</span></div>
      </div>
      <div className="pa3 flex justify-end">
        <span className="ma2 f4">${product.price}</span>
        {/* TODO Implement the AddToCart button */}
        <AddToCart product={product} />
      </div>
    </article>

  )
}
  );
}