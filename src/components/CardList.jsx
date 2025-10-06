import React, { useState, useEffect } from "react";
import Card from "./Card";
import Button from "./Button";
import { BASE_URL } from "../config";

const LIMIT = 10;

export default function CardList() {
  const [products, setProducts] = useState([]);
  const [offset, setOffset] = useState(0);

  const fetchProducts = () => {
    fetch(`${BASE_URL}/products?offset=${offset}&limit=${LIMIT}`)
      .then((res) => res.json())
      .then((data) => setProducts(Array.isArray(data) ? data : []));
  };

  useEffect(() => {
    fetchProducts();
  }, [offset]);

  const handlePrevious = () => setOffset((o) => Math.max(0, o - LIMIT));
  const handleNext = () => setOffset((o) => o + LIMIT);

  return (
    <div className="cf pa2">
      <div className="mt2 mb2">
        {products.map((p) => (
          <Card key={p.id || p._id} {...p} id={p.id || p._id} />
        ))}
      </div>
      <div className="flex items-center justify-center pa4">
        <Button text="Previous" handleClick={handlePrevious} />
        <Button text="Next" handleClick={handleNext} />
      </div>
    </div>
  );
}
