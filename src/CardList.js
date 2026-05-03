// CardList.js
import React, { useState, useEffect } from "react";
import { BASE_URL } from '../config';
import Card from './Card'; // Ensure this path is correct
import Button from './Button'; // Ensure this path is correct

const CardList = () => {
  // 1. Define state for products and pagination offset
  const [products, setProducts] = useState([]);
  const [offset, setOffset] = useState(0);
  const limit = 10; // Or whatever your preferred limit is

  // 2. Create the fetch function
  const fetchProducts = () => {
    fetch(`${BASE_URL}/products?offset=${offset}&limit=${limit}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((err) => console.error("Error fetching products:", err));
  };

  // 3. Use useEffect to fetch data when the component boots 
  // AND whenever the 'offset' changes
  useEffect(() => {
    fetchProducts();
  }, [offset]);

  // 4. Pagination Handlers
  const handlePrevious = () => {
    setOffset((prev) => Math.max(0, prev - limit));
  };

  const handleNext = () => {
    setOffset((prev) => prev + limit);
  };

  return (
    <div className="cf pa2">
      <div className="mt2 mb2">
        {/* 5. Map over the state variable 'products' */}
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
