// src/components/CardList.js
import React, { useState, useEffect } from "react";
import { BASE_URL } from "../config";
import Card from "./Card"; // Assuming you have a Card component to render each product
import Button from "./Button"; // Assuming you have a Button component for pagination

const CardList = () => {
  const [products, setProducts] = useState([]);
  const [offset, setOffset] = useState(0);
  const limit = 10;

  const fetchProducts = () => {
    fetch(`${BASE_URL}/products?offset=${offset}&limit=${limit}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, [offset]);

  const handlePrevious = () => {
    setOffset((prevOffset) => Math.max(prevOffset - limit, 0));
  };

  const handleNext = () => {
    setOffset((prevOffset) => prevOffset + limit);
  };

  return (
    <div className="cf pa2">
      <div className="mt2 mb2">
        {products.map((product) => (
          <Card key={product.id} {...product} />
        ))}
      </div>
      <div className="flex items-center justify-center pa4">
        <Button text="Previous" handleClick={handlePrevious} />
        <Button text="Next" handleClick={handleNext} />
      </div>
    </div>
  );
};

export default CardList;
