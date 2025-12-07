import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import config from "../config";
import AddToCart from "./AddToCart";
const SingleView = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(`${config.BASE_URL}/products/${id}`);
        if (!res.ok) throw new Error("Failed to fetch product");
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.error(err);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [id]);

  if (loading) {
    return <p className="pa4">Loading…</p>;
  }

  if (!product) {
    return (
      <div className="pa4">
        <Link to="/" className="link dim blue db mb3">
          ← Back to products
        </Link>
        <p>Product not found.</p>
      </div>
    );
  }

  const imageUrl =
    product.urls?.regular || product.image || product.urls?.small || "";
  const title = product.description || product.name || "Untitled";
  const author =
    product.user?.name ||
    [product.user?.first_name, product.user?.last_name]
      .filter(Boolean)
      .join(" ") ||
    "Unknown";
  const likes = product.likes ?? 0;
  const price = product.price ?? 0;

  return (
    <div className="pa4">
      <Link to="/" className="link dim blue db mb3">
        ← Back to products
      </Link>

      <div className="flex flex-column flex-row-ns">
        <div className="w-100 w-70-ns pr4-ns">
          {imageUrl && (
            <img
              src={imageUrl}
              alt={title}
              className="w-100"
              style={{ objectFit: "cover" }}
            />
          )}
        </div>

        <div className="w-100 w-30-ns mt3 mt0-ns">
          <h1 className="f2 mb2">{title}</h1>
          <p className="gray mb2">By {author}</p>
          <p className="gray mb3">{likes} Likes</p>
          <p className="b f3 mb3">${price.toFixed(2)}</p>

          <AddToCart product={product} />
        </div>
      </div>
    </div>
  );
};

export default SingleView;
