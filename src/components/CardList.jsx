import React, { useState, useEffect } from 'react'
import Card from './Card'
import Button from './Button'
import Search from './Search'
import { BASE_URL } from '../config'

const limit = 10;

const CardList = () => {
  const [offset, setOffset] = useState(0);
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);

  const fetchProducts = () => {
    fetch(`${BASE_URL}/products?offset=${offset}&limit=${limit}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setAllProducts(data);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, [offset]);

  const filterTags = (tagQuery) => {
    const filtered = tagQuery
      ? allProducts.filter(product =>
          product.tags && product.tags.find(({ title }) => title === tagQuery)
        )
      : allProducts;
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
        <Button text="Previous" handleClick={() => setOffset(offset - limit)} />
        <Button text="Next" handleClick={() => setOffset(offset + limit)} />
      </div>
    </div>
  );
};

export default CardList;
