// src/components/SingleView.js
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../config";
import AddToCart from "./AddToCart"; // Import AddToCart button

const SingleView = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  const fetchProductById = async (id) => {
    const res = await fetch(`${BASE_URL}/products/${id}`);
    const product = await res.json();
    setProduct(product);
  };

  useEffect(() => {
    fetchProductById(id);
  }, [id]);

  if (!product) return <div className="loading-spinner"></div>;

  return (
    <article className="bg-white center mw7 ba b--black-10 mv4">
      <div className="pv2 ph3">
        <h1 className="ml3 f4">{product.name}</h1>
        <img src={product.image_url} alt={product.name} />
        <p>{product.description}</p>
        <div className="pa3 flex justify-end">
          <span className="ma2 f4">${product.price}</span>
          <AddToCart product={product} /> {/* AddToCart button */}
        </div>
      </div>
    </article>
  );
};

export default SingleView;
