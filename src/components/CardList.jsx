// src/components/CardList.jsx

import React, { useState, useEffect, useCallback } from "react";
import Card from "./Card";
import Button from "./Button";
import Search from "./Search";
import { BASE_URL } from "../config";

const CardList = () => {
  const limit = 10;
  const [offset, setOffset] = useState(0);
  const [products, setProducts] = useState([]);

  // Fetch products from the backend
  const fetchProducts = useCallback(() => {
    fetch(`${BASE_URL}/products?offset=${offset}&limit=${limit}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, [offset, limit]);

  // Run fetch on component load or offset change
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Optional search filter (if Search component used)
  const filterTags = (tagQuery) => {
    if (!tagQuery) {
      fetchProducts();
      return;
    }
    const filtered = products.filter((product) =>
      product.tags?.some(({ title }) => title === tagQuery)
    );
    setOffset(0);
    setProducts(filtered);
  };

  // Handlers for pagination
  const handlePrevious = () => {
    setOffset((prev) => Math.max(prev - limit, 0));
  };

  const handleNext = () => {
    setOffset((prev) => prev + limit);
  };

  return (
    <div className="cf pa2">
      <Search handleSearch={filterTags} />
      <div
        className="mt2 mb2 grid gap3"
        style={{ gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))" }}
      >
        {products.length > 0 ? (
          products.map((product) => (
            <Card key={product.id || product._id} {...product} />
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
      <div className="flex items-center justify-center pa4">
        <Button text="Previous" handleClick={handlePrevious} />
        <Button text="Next" handleClick={handleNext} />
      </div>
    </div>
  );
};

export default CardList;
