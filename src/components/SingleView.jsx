import React from 'react'
import { useParams } from 'react-router-dom';
import '../App.css';


export default function SingleView({data}) {
  // get the id from the url using useParams
  const { id } = useParams();
  
  // get the product from the data using the id
  const product = data.find(product => product.id === id);

  const { user } = product;

  const title = product.description ?? product.alt_description;
  const style = {
    backgroundImage: `url(${product.urls["regular"]})`
  }

  return (
    <article class="bg-white center mw7 ba b--black-10 mv4">
      <div class="pv2 ph3">
        <div class="flex items-center">
          <img src={user?.profile_image?.medium} class="br-100 h3 w3 dib" alt={user.instagram_username} />
          <h1 class="ml3 f4">{user.first_name} {user.last_name}</h1>
        </div>
      </div>
      <div class="aspect-ratio aspect-ratio--4x3">
        <div class="aspect-ratio--object cover" style={style}></div>
      </div>
      <div class="pa3 flex justify-between">
        <div class="mw6">
          <h1 class="f6 ttu tracked">Product ID: {id}</h1>
          <a href={`/products/${id}`} class="link dim lh-title">{title}</a>
        </div>
        <div class="gray db pv2">&hearts;<span>{product.likes}</span></div>
      </div>
      <div className="pa3 flex justify-end">
        <span className="ma2 f4">${product.price}</span>
        {/* TODO Implement the AddToCart button */}
      </div>
    </article>

  )
}
// src/components/SingleView.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../config";
import AddToCart from "./AddToCart";

export default function SingleView() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProductById = async (id) => {
    const res = await fetch(`${BASE_URL}/products/${id}`);
    if (!res.ok) throw new Error("Failed to fetch product");
    return res.json();
  };

  useEffect(() => {
    if (!id) return;
    let mounted = true;
    setLoading(true);
    fetchProductById(id)
      .then((data) => {
        if (mounted) setProduct(data);
      })
      .catch((e) => console.error(e))
      .finally(() => mounted && setLoading(false));
    return () => { mounted = false; };
  }, [id]);

  if (loading) return <div className="loading-spinner">Loading...</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div className="single-view">
      <h2>{product.title || product.name}</h2>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <AddToCart product={product} />
    </div>
  );
}
