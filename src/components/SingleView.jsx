import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../App.css';
import AddToCart from './AddToCart';
import { BASE_URL } from '../config';
export default function SingleView() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const fetchProductById = async () => {
    console.log(`Fetching product details for ID: ${id}`); // ✅ Debugging Log
    try {
      const response = await fetch(`${BASE_URL}/products/${id}`);
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

      const data = await response.json();
      console.log("Product details received:", data); // ✅ Debugging Log
      return data;
    } catch (error) {
      console.error("Error fetching product:", error);
      return null;
    }
  };

  useEffect(() => {
    const getProduct = async () => {
      setLoading(true);
      const data = await fetchProductById();
      setProduct(data);
      setLoading(false);
    };
    getProduct();
  }, [id]); // ✅ Ensures re-fetching when ID changes

  if (loading) return <div className="loading-spinner">Loading...</div>;
  if (!product) return <div>No product found.</div>;

  const { user } = product;
  const title = product.description ?? product.alt_description;
  const style = {
    backgroundImage: `url(${product?.urls?.regular || ""})`
  };

  return (
    <article className="bg-white center mw7 ba b--black-10 mv4">
      <div className="pv2 ph3">
        <div className="flex items-center">
          <img src={user?.profile_image?.medium || "default-profile.png"} className="br-100 h3 w3 dib" alt={user?.instagram_username || "User"} />
          <h1 className="ml3 f4">{user?.first_name || "Unknown"} {user?.last_name || ""}</h1>
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
               <div className="gray db pv2">&hearts;<span>{product.likes || 0}</span></div>
      </div>
      <div className="pa3 flex justify-end">
        <span className="ma2 f4">${product.price}</span>
              <AddToCart product={product} />
      </div>
    </article>
      );
}