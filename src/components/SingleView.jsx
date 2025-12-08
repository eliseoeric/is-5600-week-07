import React from 'react'
import { useParams } from 'react-router-dom';
import '../App.css';
// src/components/SingleView.jsx
import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../state/CartProvider";


export default function SingleView({data}) {
  // get the id from the url using useParams
export default function SingleView() {
  const { id } = useParams();

  // get the product from the data using the id
  const product = data.find(product => product.id === id);

  const { user } = product;
  const { addToCart } = useContext(CartContext);

  const title = product.description ?? product.alt_description;
  const style = {
    backgroundImage: `url(${product.urls["regular"]})`
  }
  // Dummy product for demo
  const product = { id, name: `Product ${id}` };

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
    <div>
      <h2>Product Details</h2>
      <p>ID: {product.id}</p>
      <p>Name: {product.name}</p>
      <button onClick={() => addToCart(product)}>Add to Cart</button>
    </div>
  );
}