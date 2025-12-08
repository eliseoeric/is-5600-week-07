import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../App.css';
import { BASE_URL } from '../config';
import AddToCart from './AddToCart';

export default function SingleView() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  const fetchProductById = async () => {
    const res = await fetch(`${BASE_URL}/products/${id}`);
    const data = await res.json();
    setProduct(data);
  };

  useEffect(() => {
    fetchProductById();
  }, [id]);

  if (!product) {
    return <div className="loading-spinner"></div>;
  }

  const title =
    product?.description ||
    product?.alt_description ||
    "Untitled Product";

  // Fix: use id, not _id; add safe fallback image
  const imageUrl =
    product?.urls?.regular && product.urls.regular.trim() !== ""
      ? product.urls.regular
      : "https://via.placeholder.com/800x600?text=No+Image+Available";

  const style = {
    backgroundImage: `url(${imageUrl})`,
    backgroundSize: "cover",
    backgroundPosition: "center"
  };

  return (
    <article className="bg-white center mw7 ba b--black-10 mv4">

      {/* USER HEADER */}
      <div className="pv2 ph3">
        <div className="flex items-center">
          <div className="br-100 h3 w3 bg-light-gray tc flex items-center justify-center">
            <span className="f3">
              {product?.user?.first_name?.[0] || "?"}
            </span>
          </div>

          <h1 className="ml3 f4">
            {product?.user?.first_name || ""} {product?.user?.last_name || ""}
          </h1>
        </div>
      </div>

      {/* PRODUCT IMAGE */}
      <div className="aspect-ratio aspect-ratio--4x3 w-100">
        <div className="aspect-ratio--object cover" style={style}></div>
      </div>

      {/* DESCRIPTION + LIKES */}
      <div className="pa3 flex justify-between">
        <div className="mw6">
          <h1 className="f6 ttu tracked">PRODUCT ID: {product.id}</h1>
          <p className="lh-title">{title}</p>
        </div>

        <div className="gray db pv2">
          ❤️ <span>{product?.likes}</span>
        </div>
      </div>

      {/* PRICE + ADD TO CART */}
      <div className="pa3 flex justify-end items-center">
        <span className="ma2 f4">${product?.price}</span>
        <AddToCart product={product} />
      </div>
    </article>
  );
}
