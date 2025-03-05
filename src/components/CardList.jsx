import React, { useState, useEffect } from 'react';
import Card from './Card';
import Button from './Button';
import Search from './Search';
import { BASE_URL } from '../config';

const CardList = ({ data = [] }) => {
  const limit = 10;
  const [offset, setOffset] = useState(0);
  const [products, setProducts] = useState(data.slice(0, limit));

  useEffect(() => {
    fetchProducts();
  }, [offset]);

  const fetchProducts = () => {
    fetch(`${BASE_URL}/products?offset=${offset}&limit=${limit}`)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error fetching products:', error));
  };

  const filterTags = (tagQuery) => {
    if (!tagQuery) {
      setProducts(data.slice(0, limit));
      setOffset(0);
      return;
    }

    const filtered = data.filter((product) =>
      product.tags.some(({ title }) => title === tagQuery)
    );

    setProducts(filtered);
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
          disabled={offset === 0}
        />
        <Button 
          text="Next" 
          handleClick={() => setOffset(offset + limit)} 
          disabled={products.length < limit} 
        />
      </div>
    </div>
  );
};

export default CardList;