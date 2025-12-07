import React, { useState, useEffect } from 'react';
import Card from './Card';
import Button from './Button';
import Search from './Search';
import { useCart } from '../state/CartProvider';
import { BASE_URL } from '../config';

const CardList = () => {
  const limit = 10;
  const [offset, setOffset] = useState(0);
  const [products, setProducts] = useState([]);

  const { addToCart } = useCart();

  const loadProducts = (url) => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    loadProducts(`${BASE_URL}/products?offset=${offset}&limit=${limit}`);
  }, [offset]);

  const filterTags = (tag) => {
    loadProducts(`${BASE_URL}/products?tag=${tag}`);
  };

  return (
    <div className="cf pa2">
      <Search handleSearch={filterTags} />

      <div className="mt2 mb2">
        {products.map((product) => (
          <Card key={product._id} {...product} addToCart={addToCart} />
        ))}
      </div>

      <div className="flex items-center justify-center pa4">
        <Button text="Previous" handleClick={() => setOffset(Math.max(offset - limit, 0))} />
        <Button text="Next" handleClick={() => setOffset(offset + limit)} />
      </div>
    </div>
  );
};

export default CardList;
