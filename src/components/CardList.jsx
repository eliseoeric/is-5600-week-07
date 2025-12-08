import React, { useState, useEffect } from "react";
import { BASE_URL } from "../config";
import Card from "./Card";
import Button from "./Button";

export default function CardList() {
  const [products, setProducts] = useState([]);
  const [offset, setOffset] = useState(0);
  const limit = 8;

  const fetchProducts = () => {
    fetch(`${BASE_URL}/products?offset=${offset}&limit=${limit}`)
      .then((res) => res.json())
      .then((data) => setProducts(data));
  };

  useEffect(() => {
    fetchProducts();
  }, [offset]);

  const handlePrevious = () => {
    if (offset === 0) return;
    setOffset(offset - limit);
  };

  const handleNext = () => setOffset(offset + limit);

  return (
    <div className="cf pa2">
      <div className="mt2 mb2">
        {products.map((p) => (
          <Card key={p.id} {...p} />
        ))}
      </div>

      <div className="flex items-center justify-center pa4">
        <Button text="Previous" handleClick={handlePrevious} />
        <Button text="Next" handleClick={handleNext} />
      </div>
    </div>
  );
}
