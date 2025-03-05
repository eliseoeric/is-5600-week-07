import React, { useState, useEffect } from 'react';
import Card from './Card';
import Button from './Button';
import Search from './Search';
import { BASE_URL } from '../config';

const CardList = ({ data }) => {
  // Define the limit state variable and set it to 10
  const limit = 10;

  // Define the offset state variable and set it to 0
  const [offset, setOffset] = useState(0);

  // Define the products state variable and set it to the default dataset
  const [products, setProducts] = useState(data || []);

  // Slice the products based on offset and limit
  useEffect(() => {
    setProducts(data.slice(offset, offset + limit));
  }, [offset, limit, data]);

  // Function to filter products based on tags
  const filterTags = (tagQuery) => {
    const filtered = data.filter((product) => 
      !tagQuery || product.tags.some(({ title }) => title === tagQuery)
    );
    setOffset(0);
    setProducts(filtered);
  };

  return (
    <div className="cf pa2">
      {/* Only one Search component */}
      <Search handleSearch={filterTags} />
      
      <div className="mt2 mb2">
        {/* Map over the products and render Card components */}
        {products && products.map((product) => (
          <Card key={product._id} {...product} />
        ))}
      </div>

      {/* Pagination controls */}
      <div className="flex items-center justify-center pa4">
        <Button text="Previous" handleClick={() => setOffset(offset - limit)} />
        <Button text="Next" handleClick={() => setOffset(offset + limit)} />
      </div>
    </div>
  );
};

export default CardList;
