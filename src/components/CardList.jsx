import React, { useState, useEffect } from 'react';
import Card from './Card';
import Button from './Button';
import { BASE_URL } from '../config';

const limit = 10;

const CardList = () => {
  const [products, setProducts] = useState([]);
  const [offset, setOffset] = useState(0);

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
    setOffset((prev) => Math.max(0, prev - limit));
  };

  const handleNext = () => {
    setOffset((prev) => prev + limit);
  };

  return (
    <div className="cf pa2">
      <div className="mt2 mb2">
        {products && products.map((product) => (
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
