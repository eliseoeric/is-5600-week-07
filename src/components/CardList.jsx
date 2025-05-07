import React, { useState, useEffect } from 'react';
import Card from './Card';
import Button from './Button';
import Search from './Search';
import { BASE_URL } from '../config';

const CardList = () => {
  const [offset, setOffset] = useState(0);
  const [products, setProducts] = useState([]);
  const [limit] = useState(10);

  const fetchProducts = () => {
    fetch(`${BASE_URL}/products?offset=${offset}&limit=${limit}`)
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(console.error);
  };

  const filterByTag = (query) => {
    if (!query) {
      fetchProducts();
      return;
    }
    const filtered = products.filter(product =>
      product.tags.some(tag => tag.title.toLowerCase().includes(query.toLowerCase()))
    );
    setProducts(filtered);
  };

  useEffect(() => {
    fetchProducts();
  }, [offset]);

  return (
    <div className="cf pa2">
      <Search handleSearch={filterByTag} />
      <div className="mt2 mb2">
        {products.map(product => (
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
