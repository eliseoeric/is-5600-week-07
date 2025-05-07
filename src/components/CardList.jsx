import React, { useState, useEffect } from 'react';
import Card from './Card';
import Button from './Button';
import Search from './Search';
import { BASE_URL } from '../config';

const CardList = () => {
  const limit = 10;
  const [offset, setOffset] = useState(0);
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);

  const fetchProducts = () => {
    fetch(`${BASE_URL}/products`)
      .then((res) => res.json())
      .then((data) => {
        setAllProducts(data);
        setProducts(data.slice(offset, offset + limit));
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    setProducts(allProducts.slice(offset, offset + limit));
  }, [offset, allProducts]);

  const filterTags = (tagQuery) => {
    const filtered = allProducts.filter(product =>
      product.tags && product.tags.includes(tagQuery)
    );
    setProducts(filtered);
  };

  const handlePrevious = () => {
    setOffset(prev => Math.max(prev - limit, 0));
  };

  const handleNext = () => {
    if (offset + limit < allProducts.length) {
      setOffset(prev => prev + limit);
    }
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
        <Button text="Previous" handleClick={handlePrevious} />
        <Button text="Next" handleClick={handleNext} />
      </div>
    </div>
  );
};

export default CardList;
