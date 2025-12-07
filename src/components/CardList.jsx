import React, { useState, useEffect } from "react";
import { BASE_URL } from "../config";
import Card from "./Card";
import Button from "./Button";

const CardList = () => {
  const [products, setProducts] = useState([]);
  const [offset, setOffset] = useState(0);
  const limit = 8;

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${BASE_URL}/products?offset=${offset}&limit=${limit}`);
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [offset]);

  const handlePrevious = () => setOffset(Math.max(0, offset - limit));
  const handleNext = () => setOffset(offset + limit);

  return (
    <div className="cf pa2">
      <div className="mt2 mb2">
        {products.map((product) => (
          <Card key={product._id} {...product} />
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
