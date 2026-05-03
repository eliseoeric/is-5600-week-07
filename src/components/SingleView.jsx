import React, { useState, useEffect } from 'react' // 1. Added useState and useEffect
import { useParams } from 'react-router-dom';
import { BASE_URL } from '../config'; // 2. Import BASE_URL
import AddToCart from './AddToCart'; // 3. Import the new button component
import '../App.css';

export default function SingleView() { // 4. Removed {data} prop
  const { id } = useParams();
  
  // 5. Setup state for the single product
  const [product, setProduct] = useState(null);

  // 6. Fetch the product by ID from the server
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${BASE_URL}/products/${id}`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    fetchProduct();
  }, [id]);

  // 7. Show a loading state while waiting for the API
  if (!product) {
    return <div className="vh-100 flex items-center justify-center">Loading...</div>;
  }

  const { user } = product;
  const title = product.description ?? product.alt_description;
  const style = {
    backgroundImage: `url(${product.urls["regular"]})`
  }

  return (
    <article className="bg-white center mw7 ba b--black-10 mv4">
      <div className="pv2 ph3">
        <div className="flex items-center">
          <img src={user?.profile_image?.medium} className="br-100 h3 w3 dib" alt={user?.instagram_username} />
          <h1 className="ml3 f4">{user?.first_name} {user?.last_name}</h1>
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
      <div className="pa3 flex justify-end items-center">
        <span className="ma2 f4">${product.price}</span>
        {/* 8. Pass the product object to the AddToCart component */}
        <AddToCart product={product} />
      </div>
    </article>
  )
}