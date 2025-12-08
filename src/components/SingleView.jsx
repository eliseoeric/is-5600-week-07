import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../config";
import AddToCart from "./AddToCart";
import "../App.css";

export default function SingleView({ data = [] }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Reset
    setError(null);
    setProduct(null);
    setLoading(true);
    if (!id) {
      setLoading(false);
      return;
    }

    // Try to find in provided data first (supports both id and _id)
    const foundLocal = (Array.isArray(data) ? data : []).find(
      (item) => String(item.id) === String(id) || String(item._id) === String(id)
    );
    if (foundLocal) {
      setProduct(foundLocal);
      setLoading(false);
      return;
    }

    // If not found locally, try backend (if BASE_URL present)
    const fetchFromServer = async () => {
      try {
        const url = `${BASE_URL.replace(/\/$/, "")}/products/${id}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error(`Server returned ${res.status}`);
        const json = await res.json();
        setProduct(json);
      } catch (err) {
        // don't crash — show friendly message
        setError(err.message || "Failed to fetch product");
      } finally {
        setLoading(false);
      }
    };

    fetchFromServer();
  }, [id, data]);

  if (loading) return <div className="loading-spinner" style={{ padding: 40 }}>Loading…</div>;
  if (error) return <div style={{ padding: 40 }}><h2>Error loading product</h2><p>{error}</p></div>;
  if (!product) return <h2 style={{ padding: 20 }}>Product not found</h2>;

  // safe reading of fields (support both shapes)
  const user = product.user || {};
  const title = product.description || product.alt_description || product.title || "No description available";
  const image = (product.urls && (product.urls.regular || product.urls.small)) || product.img || product.imgThumb || product.image || "";
  // price fallback: if missing treat as null; formatting below
  const rawPrice = product.price;
  const priceNumber = typeof rawPrice === "number" ? rawPrice : (rawPrice ? Number(rawPrice) : null);

  return (
    <article className="bg-white center mw7 ba b--black-10 mv4">
      <div className="pv2 ph3">
        <div className="flex items-center">
          {user?.profile_image?.medium ? (
            <img src={user.profile_image.medium} className="br-100 h3 w3 dib" alt={user?.name || "User"} />
          ) : null}
          <h1 className="ml3 f4">{user?.first_name ? `${user.first_name} ${user.last_name || ""}` : product.userName || user.name || "Unknown Artist"}</h1>
        </div>
      </div>

      <div className="aspect-ratio aspect-ratio--4x3">
        {image ? (
          <img src={image} alt={title} className="aspect-ratio--object cover" />
        ) : (
          <div className="aspect-ratio--object cover" style={{ backgroundColor: "#f7f7f7" }} />
        )}
      </div>

      <div className="pa3 flex justify-between">
        <div className="mw6">
          <h1 className="f6 ttu tracked">Product ID: {id}</h1>
          <p className="link dim lh-title">{title}</p>
        </div>
        <div className="gray db pv2">&hearts; <span>{product.likes ?? 0}</span></div>
      </div>

      <div className="pa3 flex justify-end">
        <span className="ma2 f4">{priceNumber != null ? `$${priceNumber.toFixed(2)}` : "$N/A"}</span>
        <AddToCart product={product} />
      </div>
    </article>
  );
}
