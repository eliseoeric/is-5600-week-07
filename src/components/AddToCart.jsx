import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { BASE_URL } from '../config';
import AddToCart from './AddToCart'
import '../App.css';


export default function SingleView() {
  // get the id from the url using useParams
  const { id } = useParams();

  const [product, setProduct] = useState(null)

  const fetchProductById = (id) => {
    fetch(`${BASE_URL}/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data)
      })
  };

  useEffect(() => {
    fetchProductById(id)
  }, [id]);

  if (!product) return (<div className="loading-spinner"></div>);

  const { user } = product;

  const title = product.description ?? product.alt_description;
  const style = {
    backgroundImage: `url(${product.urls["regular"]})`
  }

  return (
    <article className="bg-white center mw7 ba b--black-10 mv4">
      <div className="pv2 ph3">
        <div className="flex items-center">
          <img src={user?.profile_image?.medium} className="br-100 h3 w3 dib" alt={user.instagram_username} />
          <h1 className="ml3 f4">{user.first_name} {user.last_name}</h1>
        </div>
      </div>
      <div className="aspect-ratio aspect-ratio--4x3">
        <div className="aspect-ratio--object cover" style={style}></div>
      </div>
      <div className="pa3 flex justify-between">
        <div className="mw6">
          <h1 className="f6 ttu tracked">Product ID: {id}</h1>
          <a href={`/products/${id}`} className="link dim lh-title">{title}</a>
        </div>
        <div className="gray db pv2">&hearts;<span>{product.likes}</span></div>
      </div>
      <div className="pa3 flex justify-end">
        <span className="ma2 f4">${product.price}</span>
        <AddToCart product={product} />
      </div>
    </article>

  )
}
