import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../config";
import AddToCart from "./AddToCart";

export default function SingleView() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    let alive = true;
    fetch(`${BASE_URL}/products/${id}`)
      .then((r) => r.json())
      .then((data) => { if (alive) setProduct(data); });
    return () => { alive = false; };
  }, [id]);

  if (!product) return <div className="pa3">Loading…</div>;

  return (
    <article className="center mw7 mv4 pa3 ba b--black-10">
      <h1 className="f2 mb2">{product.title ?? product.description}</h1>
      <p className="mb3">{product.description}</p>
      <div className="pa3 flex justify-end items-center">
        <span className="ma2 f4">${product.price}</span>
        <AddToCart product={product} />
      </div>
    </article>
  );
}
