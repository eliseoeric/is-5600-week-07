// src/components/CardList.js
import React, { useState, useEffect } from "react";
import { BASE_URL } from "../config";
import Card from "./Card";

const limit = 10;

const CardList = () => {
  const [products, setProducts] = useState([]);
  const [offset, setOffset] = useState(0);

  // Fetch products from server
  const fetchProducts = () => {
    fetch(`${BASE_URL}/products?offset=${offset}&limit=${limit}`)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching products:", err));
  };

  useEffect(() => {
    fetchProducts();
  }, [offset]);

  return (
    <div>
      {products.map((product) => (
        <Card key={product.id} product={product} />
      ))}

      <div>
        <button onClick={() => setOffset(Math.max(0, offset - limit))}>
          Previous
        </button>
        <button onClick={() => setOffset(offset + limit)}>Next</button>
      </div>
    </div>
  );
};

export default CardList;
