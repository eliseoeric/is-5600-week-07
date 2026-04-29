import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../config";
import AddToCart from "./AddToCart";

export default function SingleView() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`${BASE_URL}/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((err) => console.error("Error fetching product:", err));
  }, [id]);

  if (!product) return <h2 className="pa4">Loading...</h2>;

  const { user } = product;

  return (
    <div className="pa4">
      <img
        src={product.urls?.regular}
        alt={product.description || "product"}
        width="400"
      />

      <h2 className="mt3">
        {product.description ?? product.alt_description}
      </h2>

      <p>
        {user?.first_name} {user?.last_name}
      </p>

      <p>{product.likes} Likes</p>
      <p>${product.price}</p>

      {/* ✅ Add to Cart button */}
      <AddToCart product={product} />
    </div>
  );
}