import React, { useEffect, useState } from "react";
import { BASE_URL } from "../config";
import { useParams } from "react-router-dom";

export default function SingleView() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  const fetchProductById = async () => {
    const data = await fetch(`${BASE_URL}/products/${id}`)
      .then((res) => res.json());

    setProduct(data);
  };

  useEffect(() => {
    fetchProductById();
  }, []);

  return (
    <div>
      {/* your product UI */}
    </div>
  );
}
