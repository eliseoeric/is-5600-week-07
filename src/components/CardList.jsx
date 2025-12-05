import React, { useState, useEffect } from 'react';
import Card from './Card';
import Button from './Button';
import Search from './Search';
import { BASE_URL } from '../config';

const CardList = () => {
  // How many products per page
  const limit = 10;

  // Pagination + tag filter
  const [offset, setOffset] = useState(0);
  const [products, setProducts] = useState([]);
  const [tagQuery, setTagQuery] = useState('');

  const fetchProducts = () => {
    const params = new URLSearchParams({
      offset: String(offset),
      limit: String(limit),
    });

    if (tagQuery) {
      params.append('tag', tagQuery);
    }

    fetch(`${BASE_URL}/products?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((err) => {
        console.error('Error fetching products:', err);
      });
  };

  // Re-fetch when page or tag changes
  useEffect(() => {
    fetchProducts();
  }, [offset, tagQuery]);

  // Called by Search component
  const filterTags = (tag) => {
    setOffset(0);       // reset to first page
    setTagQuery(tag);   // update tag filter
  };

  const handlePrevious = () => {
    setOffset((prev) => Math.max(prev - limit, 0));
  };

  const handleNext = () => {
    setOffset((prev) => prev + limit);
  };

  return (
    <div className="cf pa2">
      <Search filter={filterTags} />
      <div className="mt2 mb2">
        {products && products.map((product) => (
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