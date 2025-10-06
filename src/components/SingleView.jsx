import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../App.css";
import { BASE_URL } from "../config";
import { useCart } from "../state/CartProvider";

export default function SingleView() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    fetch(`${BASE_URL}/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [id]);

  if (!product) return <div className="loading-spinner"></div>;

  return (
    <article className="center mw6 mv4 ba">
      <div className="flex">
        <img src={product.image} alt={product.title} className="w-50 pa3" />
        <div className="w-50 pa3">
          <h1 className="f3 mv2">{product.title}</h1>
          <p className="mv2">{product.description}</p>
        </div>
      </div>
      <div className="pa3 flex justify-end">
        <span className="ma2 f4">${product.price}</span>
        <a
          className="f6 link dim br3 ba bw1 ph3 pv2 mb2 dib black"
          onClick={() => addToCart({ ...product, _id: product.id || product._id })}
        >
          Add to Cart
        </a>
      </div>
    </article>
  );
}
