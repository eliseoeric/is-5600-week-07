import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../config";
import AddToCart from "./AddToCart";

export default function SingleView() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  const fetchProductById = async (id) => {
    const product = await fetch(`${BASE_URL}/products/${id}`)
      .then((res) => res.json());
    return product;
  };

  useEffect(() => {
    const getProduct = async () => {
      const data = await fetchProductById(id);
      setProduct(data);
    };
    getProduct();
  }, [id]);

  if (!product) return <div className="loading-spinner"></div>;

  return (
    <article className="mw7 center bg-white br3 pa3 pa4-ns mv3 ba b--black-10">
      <h1 className="f3 mb2">{product.description}</h1>
      <img src={product.urls?.regular} alt="" className="w-100"/>
      <p className="f6 gray">Likes: {product.likes}</p>

      {/*  ADD TO CART BUTTON */}
      <AddToCart product={product} />
    </article>
  );
}
