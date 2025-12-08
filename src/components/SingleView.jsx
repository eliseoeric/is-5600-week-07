import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import config from "../config";
import AddToCart from "./AddToCart";

export default function SingleView() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`${config.BASE_URL}/products/${id}`)
      .then((r) => (r.ok ? r.json() : null))
      .then(setProduct)
      .catch(() => setProduct(null));
  }, [id]);

  if (product === null)
    return (
      <div className="pa4">
        <Link to="/" className="link dim blue db mb3">← Back</Link>
        <p>Loading or not found.</p>
      </div>
    );

  const img =
    product.urls?.regular ||
    product.image ||
    product.urls?.small ||
    "";
  const title = product.description || product.name || "Untitled";
  const author =
    product.user?.name ||
    [product.user?.first_name, product.user?.last_name].filter(Boolean).join(" ") ||
    "Unknown";

  return (
    <div className="pa4">
      <Link to="/" className="link dim blue db mb3">← Back</Link>

      <div className="flex flex-column flex-row-ns">
        <div className="w-100 w-70-ns pr4-ns">
          {img && <img src={img} alt={title} className="w-100" />}
        </div>

        <div className
