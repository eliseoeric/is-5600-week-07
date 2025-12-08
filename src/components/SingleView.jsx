// src/components/SingleView.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../config";
import AddToCart from "./AddToCart";

export default function SingleView() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetch(`${BASE_URL}/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Product fetch failed");
        return res.json();
      })
      .then((data) => setProduct(data))
      .catch((err) => {
        console.error("fetch product", err);
        setProduct(null);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div>Loading product...</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <article style={{ border: "1px solid #eee", padding: 12, borderRadius: 8, background: "#fff" }}>
      <h2>{product.description || "Untitled product"}</h2>
      <div style={{ display: "flex", gap: 12 }}>
        <div style={{ width: 320 }}>
          <img src={product.urls?.regular} alt="" style={{ width: "100%", borderRadius: 6 }} />
        </div>
        <div style={{ flex: 1 }}>
          <p><strong>Price:</strong> ${product.price ?? "0.00"}</p>
          <p><strong>Likes:</strong> {product.likes ?? 0}</p>
          <p><strong>Author:</strong> {product.user?.name || product.user?.first_name || "—"}</p>
          <div style={{ marginTop: 12 }}>
            <AddToCart product={product} />
          </div>
        </div>
      </div>
    </article>
  );
}
