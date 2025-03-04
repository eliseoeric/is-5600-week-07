import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { BASE_URL } from '../config';
import OrderButton from './AddToCart'; // Import the OrderButton component
import '../App.css';

export default function SingleView() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  const fetchProductById = async (id) => {
    const product = await fetch(`${BASE_URL}/products/${id}`).then((res) => res.json());
    return product;
  };

  useEffect(() => {
    const getProduct = async () => {
      if (id) {
        const data = await fetchProductById(id);
        setProduct(data);
      }
    };
    getProduct();
  }, [id]);

  if (!product) return <div className="loading-spinner"></div>;

  const user = product?.user || {};
  const title = product?.alt_description || 'Unknown Title';

  return (
    <article className="bg-white center mw7 ba b--black-10 mv4">
      <div className="pv2 ph3">
        <div className="flex items-center">
          <img src={user?.portfolio_url} className="br-100 h3 w3 dib" alt={user.username} />
          <h1 className="ml3 f4">{user.first_name} {user.last_name}</h1>
        </div>
      </div>

      {/* Display Image */}
      <div className="aspect-ratio aspect-ratio--4x3">
        <img src={product?.urls?.regular} alt={title} className="w-100 h-auto" />
      </div>

      <div className="pa3 flex justify-between">
        <div className="mw6">
          <h1 className="f6 ttu tracked">Product ID: {id}</h1>
          <a href={product?.links?.html} className="link dim lh-title">{title}</a>
        </div>
        <div className="gray db pv2">&hearts;<span>{product.likes}</span></div>
      </div>

      <div className="pa3 flex justify-end items-center">
        <span className="ma2 f4">${product.price}</span>
        <OrderButton product={product} />  {/* Add the OrderButton component */}
      </div>
    </article>
  );
}