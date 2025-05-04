import React, { useState, useEffect } from 'react';
import productData from '../data/full-products'; // mock data
import Card from './Card';
import Button from './Button';
import Search from './Search';

const CardList = () => {
  const limit = 10;

  const [offset, setOffset] = useState(0);
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);

  // Load initial data
  useEffect(() => {
    setAllProducts(productData);
  }, []);

  // Update visible products when offset or data changes
  useEffect(() => {
    const start = offset;
    const end = offset + limit;
    const sliced = allProducts.slice(start, end);
    setProducts(sliced);
  }, [offset, allProducts]);

  // Filter by tag
  const filterTags = (tagQuery) => {
    if (!tagQuery) {
      setProducts(allProducts.slice(offset, offset + limit));
      return;
    }

    const filtered = allProducts.filter(product =>
      product.tags?.some(tag => tag.title.toLowerCase() === tagQuery.toLowerCase())
    );

    setOffset(0);
    setProducts(filtered);
  };

  return (
    <div className="cf pa2">
      <Search handleSearch={filterTags} />

      <div className="mt2 mb2 flex flex-wrap">
        {products.length > 0 ? (
          products.map(product => (
            <Card key={product._id ?? product.id} {...product} />
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>

      <div className="flex items-center justify-center pa4">
        <Button
          text="Previous"
          handleClick={() => setOffset(Math.max(0, offset - limit))}
        />
        <Button
          text="Next"
          handleClick={() => setOffset(offset + limit)}
        />
      </div>
    </div>
  );
};

export default CardList;
