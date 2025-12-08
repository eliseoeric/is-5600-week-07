import React, { useEffect, useState } from "react";
import { BASE_URL } from "../config";
import { useParams } from "react-router-dom";
import AddToCart from "./AddToCart";

export default function SingleView() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  const fetchProductById = async () => {
    const data = await fetch(`${BASE_URL}/products/${id}`).then((res) =>
      res.json()
    );
    setProduct(data);
  };

  useEffect(() => {
    fetchProductById();
  }, [id]);

  if (!product) return <div>Loading...</div>;

  return (
    <div className="pa4">
      <h2>{product.description}</h2>
      <img src={product.image} width="300" alt="" />
      <p>${product.price}</p>

      {/* Add to Cart */}
      <AddToCart product={product} />
    </div>
  );
}
