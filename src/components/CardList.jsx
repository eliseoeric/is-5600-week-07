import React, { useState, useEffect } from 'react';
import Card from './Card';
import Button from './Button';
import Search from './Search';
import { BASE_URL } from '../config';

const CardList = ({ data }) => {
  // Pagination parameters
  const limit = 10;
  const [offset, setOffset] = useState(0);
  const [products, setProducts] = useState([]);

  // Fetch products from API with limit and offset
  const fetchProducts = () => {
    fetch(`${BASE_URL}/products?offset=${offset}&limit=${limit}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      });
  };

  // Re-fetch products when `offset` changes
  useEffect(() => {
    fetchProducts();
  }, [offset]);

  // Pagination handlers
  const handlePrevious = () => {
    if (offset > 0) setOffset(offset - limit);
  };

  const handleNext = () => {
    setOffset(offset + limit);
  };

  // Filter products by tag
  const filterTags = (tag) => {
    const filtered = data.filter((product) => {
      if (!tag) return product;
      return product.tags.find(({ title }) => title === tag);
    });

    setOffset(0); // Reset offset to the beginning
    setProducts(filtered);
  };

  // Get paginated products for rendering
  const getPaginatedProducts = () => {
    return products.slice(0, limit); // Slice data for display
  };

  return (
    <div className="cf pa2">
      {/* Implement Search if required */}
      <Search handleSearch={filterTags} />

      <div className="mt2 mb2">
        {getPaginatedProducts().map((product) => (
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
