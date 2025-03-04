import React, { useState, useEffect } from 'react';
import Card from './Card';
import Button from './Button';
import Search from './Search';
import { BASE_URL } from '../config';

const CardList = ({ data }) => {
  // Define the limit and offset state variables
  const limit = 10;
  const [offset, setOffset] = useState(0);
  const [products, setProducts] = useState(data);

  useEffect(() => {
    // Update products when offset or limit changes
    setProducts(data.slice(offset, offset + limit));
  }, [offset, limit, data]);

  const filterTags = (tagQuery) => {
    const filtered = data.filter((product) =>
      !tagQuery ? true : product.tags.some(({ title }) => title === tagQuery)
    );
    setOffset(0); // Reset offset when filtering
    setProducts(filtered);
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

