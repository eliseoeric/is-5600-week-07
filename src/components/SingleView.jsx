import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../App.css';
import { BASE_URL } from '../config';
import AddToCart from './AddToCart';

export default function SingleView() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`${BASE_URL}/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
      });
  }, [id]);

  if (!product) {
    return <div className="loading-spinner"></div>;
  }

  const title = product.description || product.alt_description;

  const style = {
    backgroundImage: `url(${product.urls?.regular})`,
  };

  return (
    <article className="bg-white center mw7 ba b--black-10 mv4">
      <div className="pv2 ph3">
        <div className="flex items-center">
          <img
            src={product.user?.profile_image?.medium}
            className="br-100 h3 w3 dib"
            alt={product.user?.instagram_username}
          />
          <h1 className="ml3 f4">
            {product.user?.first_name} {product.user?.last_name}
          </h1>
        </div>
      </div>

      <div className="aspect-ratio aspect-ratio--4x3">
        <div className="aspect-ratio--object cover" style={style}></div>
      </div>

      <div className="pa3 flex justify-between">
        <div className="mw6">
          <h1 className="f6 ttu tracked">Product ID: {id}</h1>
          <p className="lh-title">{title}</p>
        </div>

        <div className="gray db pv2">
          &hearts; <span>{product.likes}</span>
        </div>
      </div>

      <div className="pa3 flex justify-end">
        <span className="ma2 f4">${product.price}</span>
        <AddToCart product={product} />
      </div>
    </article>
  );
}