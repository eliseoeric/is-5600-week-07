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
@@ -42,4 +50,11 @@ export default function SingleView({data}) {
    </article>

  )
}
    <div>
      <h2>Product Details</h2>
      <p>ID: {product.id}</p>
      <p>Name: {product.name}</p>
      <button onClick={() => addToCart(product)}>Add to Cart</button>
    </div>
  );
}
