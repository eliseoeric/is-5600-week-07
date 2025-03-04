import React, { useState, useEffect } from 'react';
import Card from './Card';
import Button from './Button';
import Search from './Search';
import { BASE_URL } from '../config';

const CardList = ({ data }) => {
  // Define state variables
  const [offset, setOffset] = useState(0);
  const limit = 10;
  const [products, setProducts] = useState(data);

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${BASE_URL}/products?offset=${offset}&limit=${limit}`);
        const result = await response.json();
        setProducts(result);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [offset]); // Removed 'limit' since it's constant

  // Filter products by tag
  const filterTags = (tagQuery) => {
    if (!tagQuery) {
      setProducts(data);
    } else {
      const filtered = data.filter((product) =>
        product.tags.some(({ title }) => title === tagQuery)
      );
      setProducts(filtered);
    }
    setOffset(0);
  };

  return (
    <div className="cf pa2">
      <Search handleSearch={filterTags} />

      <div className="mt2 mb2">
        {products.map((product) => (
          <Card key={product._id} {...product} />
        ))}
      </div>

      <div className="flex items-center justify-center pa4">
        <Button
          text="Previous"
          handleClick={() => setOffset(Math.max(0, offset - limit))}
        />
        <Button text="Next" handleClick={() => setOffset(offset + limit)} />
      </div>
    </div>
  );
};

export default CardList;
