import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../config";
import AddToCart from "./AddToCart";

export default function SingleView() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`${BASE_URL}/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [id]);

  if (!product) {
    return <p className="pa4">Loading...</p>;
  }

  return (
    <div className="pa4">
      <article className="mw7 center">
        <img
          src={product.urls?.regular || product.urls?.small}
          alt={product.description || "Product"}
          className="w-100"
        />

        <h1>{product.description || product.alt_description}</h1>
        <p>
          {product.user?.first_name} {product.user?.last_name}
        </p>
        <p>{product.likes} Likes</p>
        <p>Price: ${product.price || 0}</p>

        <AddToCart product={product} />
      </article>
    </div>
  );
}