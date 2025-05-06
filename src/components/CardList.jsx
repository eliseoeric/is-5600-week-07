import React, { useState, useEffect } from 'react';
import { BASE_URL } from '../config';
import Card from './Card';
import Button from './Button';
import Search from './Search';

const CardList = () => {
  const limit = 10;
  const [offset, setOffset] = useState(0);
  const [products, setProducts] = useState([]);

  // Fetch products from API
  const fetchProducts = () => {
    fetch(`${BASE_URL}/products?offset=${offset}&limit=${limit}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => console.error("Error fetching products:", error));
  };

  useEffect(() => {
    fetchProducts();
  }, [offset]);

  const filterTags = (tagQuery) => {
    fetch(`${BASE_URL}/products?tag=${tagQuery}`)
      .then((res) => res.json())
      .then((filtered) => {
        setOffset(0);
        setProducts(filtered);
      })
      .catch((error) => console.error("Error filtering products:", error));
  };

  return (
    <div className="cf pa2">
      <Search handleSearch={filterTags} />
      <div className="mt2 mb2">
        {products && products.map((product) => (
          <Card key={product._id} {...product} />
        ))}
      </div>
      <div className="flex items-center justify-center pa4">
        <Button text="Previous" handleClick={() => setOffset(Math.max(0, offset - limit))} />
        <Button text="Next" handleClick={() => setOffset(offset + limit)} />
      </div>
    </div>
  );
};

export default CardList;