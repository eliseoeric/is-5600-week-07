import React, { useState, useEffect } from 'react';
import { BASE_URL } from '../config';
import Card from './Card';
import Button from './Button';
import Search from './Search';

const CardList = ({ data }) => {
  const limit = 10;
  const [offset, setOffset] = useState(0);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}/products?offset=${offset}&limit=${limit}`)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error fetching products:', error));
  }, [offset]);

  const filterTags = (tagQuery) => {
    if (!tagQuery) {
      setProducts(data.slice(offset, offset + limit)); // Reset to full dataset if no tag is provided
      return;
    }

    const filtered = data.filter(
      (product) =>
        product.tags && product.tags.some((tag) => tag.title === tagQuery)
    );

    setOffset(0);
    setProducts(filtered);
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
        <Button text="Previous" handleClick={() => setOffset(Math.max(0, offset - limit))} />
        <Button text="Next" handleClick={() => setOffset(offset + limit)} />
      </div>
    </div>
  );
};

export default CardList;
