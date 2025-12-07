import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../config";
import AddToCart from "../components/AddToCart";
import "../App.css";

export default function SingleView() {
  const { id } = useParams();

  // product state
  const [product, setProduct] = useState(null);

  // fetch product by ID
  const fetchProductById = async () => {
    const data = await fetch(`${BASE_URL}/products/${id}`)
      .then(res => res.json());
    setProduct(data);
  };

  useEffect(() => {
    fetchProductById();
  }, [id]);

  // loading spinner
  if (!product) return <div className="loading-spinner">Loading...</div>;

  return (
    <article className="bg-white center mw7 ba b--black-10 mv4">
      <div className="pv2 ph3">
        <h1 className="f3">{product.name}</h1>
      </div>

      <div className="aspect-ratio aspect-ratio--4x3">
        <div
          className="aspect-ratio--object cover"
          style={{ backgroundImage: `url(${product.image})` }}
        ></div>
      </div>

      <div className="pa3 flex justify-between">
        <div className="mw6">
          <h1 className="f6 ttu tracked">Product ID: {product.id}</h1>
          <p className="lh-title">{product.description}</p>
        </div>

        <div className="gray db pv2">
          ❤️ <span>{product.likes || 0}</span>
        </div>
      </div>

      <div className="pa3 flex justify-end items-center">
        <span className="ma2 f4">${product.price}</span>

        {/* Add to Cart Button */}
        <AddToCart product={product} />
      </div>
    </article>
  );
}
