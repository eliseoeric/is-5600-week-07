import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import '../App.css';
import AddToCart from './AddToCart';
import { BASE_URL } from '../config';

export default function SingleView({data}) {
  
// get the id from the url using useParams
const { id } = useParams();

// Define the state object for product data
const [ product, setProduct ] = useState(null)

// Fetch the product by id from the server
const fetchProductById = async (id) => {
  const product = await fetch(`${BASE_URL}/products/${id}`)
    .then((res) => res.json());
  return product;
};

useEffect(() => {
  const getProduct = async () => {
    const data = await fetchProductById(id);
    setProduct(data)
  }
  getProduct();
});

// show a spinner if there is no product loaded yet
if (!product) return (<div className="loading-spinner"></div>);

const { user } = product;

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
        <AddToCart product={product}></AddToCart>
      </div>
    </article>

  )
}