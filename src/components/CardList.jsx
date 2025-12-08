import React, { useState, useEffect } from "react";
import { BASE_URL } from "../config";
import Card from "./Card";
import Button from "./Button";

const LIMIT = 10; // items per page

const CardList = () => {
  const [products, setProducts] = useState([]);
  const [offset, setOffset] = useState(0);

  const fetchProducts = () => {
    fetch(`${BASE_URL}/products?offset=${offset}&limit=${LIMIT}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((err) => {
        console.error("Error fetching products", err);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, [offset]);

  const handleNext = () => {
    setOffset((prev) => prev + LIMIT);
  };

  const handlePrevious = () => {
    setOffset((prev) => Math.max(prev - LIMIT, 0));
  };

  return (
    <div className="cf pa2">
      <div className="mt2 mb2">
        {products &&
          products.map((product) => (
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
