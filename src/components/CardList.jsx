import React, { useState, useEffect } from 'react';
import Card from './Card';
import Button from './Button';
import { BASE_URL } from '../config';

const CardList = () => {
  const [products, setProducts] = useState([]);
  const [offset, setOffset] = useState(0);
  const limit = 10;

  useEffect(() => {
    fetch(`${BASE_URL}/products?offset=${offset}&limit=${limit}`)
      .then(res => res.json())
      .then(data => setProducts(data));
  }, [offset]);

  return (
    <div>
      {products.map(product => <Card key={product.id} {...product} />)}
      <div>
        <Button text="Previous" handleClick={() => setOffset(prev => Math.max(prev - limit, 0))} />
        <Button text="Next" handleClick={() => setOffset(prev => prev + limit)} />
      </div>
    </div>
  );
};

export default CardList;