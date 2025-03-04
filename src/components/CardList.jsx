import React, { useState, useEffect } from 'react';
import Card from './Card';
import Button from './Button';
import Search from './Search';
import { BASE_URL } from '../config';

const CardList = ({ data }) => {
  const [offset, setOffset] = useState(0);
  const [limit] = useState(10); // Define limit
  const [products, setProducts] = useState(data);

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
  }, [offset, limit]);

  const filterTags = (tagQuery) => {
    const filtered = data.filter((product) =>
      !tagQuery ? product : product.tags.some(({ title }) => title === tagQuery)
    );
    setOffset(0);
    setProducts(filtered);
  };

  return (
    <div className="cf pa2">
      <Search handleSearch={filterTags} />
      <div className="mt2 mb2">
        {products && products.map((product) => <Card key={product._id} {...product} />)}
      </div>
      <div className="flex items-center justify-center pa4">
        <Button text="Previous" handleClick={() => setOffset(Math.max(0, offset - limit))} />
        <Button text="Next" handleClick={() => setOffset(offset + limit)} />
      </div>
    </div>
  );
};

export default CardList;