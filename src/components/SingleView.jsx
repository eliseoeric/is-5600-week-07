import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { BASE_URL } from "../config";

export default function SingleView() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`${BASE_URL}/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [id]);

  if (!product) return <div>Loading...</div>;

  return (
    <div>
      <h2>{product.title || product.description}</h2>
      <p>${product.price}</p>
    </div>
  );
}
<AddToCart product={product} />