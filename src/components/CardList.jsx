import React, { useState, useEffect } from "react";
import { BASE_URL } from "../config";
import Card from "./Card";
import Button from "./Button";

export default function CardList() {
  const [products, setProducts] = useState([]);
  const [offset, setOffset] = useState(0);
  const limit = 10;

  const fetchProducts = () => {
    fetch(`${BASE_URL}/products?offset=${offset}&limit=${limit}`)
      .then(res => res.json())
      .then(data => setProducts(data));
  };

  useEffect(() => {
    fetchProducts();
  }, [offset]);

  const handleNext = () => setOffset(offset + limit);
  const handlePrevious = () => setOffset(Math.max(0, offset - limit));

  return (
    <div>
      {products.map(product => (
        <Card key={product._id} {...product} />
      ))}

      <Button text="Previous" handleClick={handlePrevious} />
      <Button text="Next" handleClick={handleNext} />
    </div>
  );
}