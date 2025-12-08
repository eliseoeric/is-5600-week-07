import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { BASE_URL } from "../config.js";
import AddToCart from "./AddToCart.jsx";

export default function SingleView() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    let ignore = false;
    async function load() {
      const res = await fetch(`${BASE_URL}/products/${id}`);
      const data = await res.json();
      if (!ignore) setProduct(data);
    }
    load();
    return () => { ignore = true; };
  }, [id]);

  if (!product) return <div className="tc pv5">Loading…</div>;

  const title = product.tags?.slice(0, 3).map((t) => t.title).join(", ") || "Untitled";

  return (
    <div className="mv4">
      <Link className="link dim" to="..">← Back</Link>
      <div className="mt3 flex flex-column flex-row-ns">
        <img
          className="br2 w-100 w-60-ns"
          src={product.urls?.regular || product.urls?.small}
          alt={product.alt_description || title}
        />
        <div className="ph3 mt3 mt0-ns w-100 w-40-ns">
          <h2 className="fw6 f3 mv2">{title}</h2>
          <p className="gray">{product.alt_description || ""}</p>
          <div className="mv3">
            <AddToCart product={product} />
          </div>
        </div>
      </div>
    </div>
  );
}
