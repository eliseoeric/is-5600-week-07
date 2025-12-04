// src/components/CardList.jsx
import React, { useState, useEffect } from "react";
import Card from "./Card";
import Button from "./Button";
import Search from "./Search";
import { BASE_URL } from '../config';

const CardList = () => {
  const limit = 10;
  const [offset, setOffset] = useState(0);
  const [products, setProducts] = useState([]);

  const fetchProducts = () => {
    fetch(`${BASE_URL}/products?offset=${offset}&limit=${limit}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      })
      .catch(err => console.error("Error fetching products:", err));
  }

  useEffect(() => {
    fetchProducts();
  }, [offset]);

  const handlePagination = (change) => {
    const newOffset = offset + change;
    if (newOffset >= 0) {
      setOffset(newOffset);
    }
  };

  // Note: Client-side tag filtering is removed/simplified because we are now server-side paginating.
  // The instructions focused on fetching and pagination offset.

  return (
    <div className="cf pa2">
      <div className="mt2 mb2 cf">
        {products && products.map((product) => (
          <Card key={product.id} {...product} />
        ))}
      </div>

      <div className="flex items-center justify-center pa4">
        <Button 
          text="Previous" 
          handleClick={() => handlePagination(-limit)} 
          disabled={offset === 0} 
        />
        <Button 
          text="Next" 
          handleClick={() => handlePagination(limit)} 
        />
      </div>
    </div>
  );
};

export default CardList;
