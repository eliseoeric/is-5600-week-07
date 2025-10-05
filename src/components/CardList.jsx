// src/components/CardList.jsx

import React, { useState, useEffect, useCallback } from "react";
import { BASE_URL } from "../config";
import Card from "./Card";
import Button from "./Button";

const CardList = () => {
  const [products, setProducts] = useState([]);
  const [offset, setOffset] = useState(0);
  const limit = 10;

  // ✅ Use useCallback to avoid missing dependency warnings
  const fetchProducts = useCallback(async () => {
    try {
      const res = await fetch(`${BASE_URL}/products?offset=${offset}&limit=${limit}`);
      if (!res.ok) {
        throw new Error(`Failed to fetch products: ${res.status}`);
      }
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  }, [offset, limit]); // dependencies — runs again when offset changes

  // ✅ useEffect now correctly uses fetchProducts
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handlePrevious = () => {
    setOffset((prev) => Math.max(prev - limit, 0));
  };

  const handleNext = () => {
    setOffset((prev) => prev + limit);
  };

  return (
    <div className="cf pa2">
      <div
        className="mt2 mb2 grid gap3"
        style={{ gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))" }}
      >
        {products.map((product) => (
          <Card key={product.id} {...product} />
        ))}
      </div>
      <div className="flex justify-center pa4">
        <Button text="Previous" handleClick={handlePrevious} />
        <Button text="Next" handleClick={handleNext} />
      </div>
    </div>
  );
};

export default CardList;
