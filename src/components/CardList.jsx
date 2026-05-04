import React, { useState, useEffect } from 'react'
import Card from './Card'
import Button from './Button'
import Search from './Search'
import { BASE_URL } from '../config';

const CardList = () => {
  const limit = 10;

  const [offset, setOffset] = useState(0);
  const [allProducts, setAllProducts] = useState([]);
  const [products, setProducts] = useState([]);

  // fetch ALL products once
  useEffect(() => {
    fetch(`${BASE_URL}/products`)
      .then((res) => res.json())
      .then((data) => {
        setAllProducts(data);
        setProducts(data.slice(0, limit));
      })
      .catch((err) => console.error("Error:", err));
  }, []);

  // handle pagination
  useEffect(() => {
    setProducts(allProducts.slice(offset, offset + limit));
  }, [offset, allProducts]);

  const filterTags = (tagQuery) => {
    if (!tagQuery) {
      setProducts(allProducts.slice(offset, offset + limit));
      return;
    }

    const filtered = allProducts.filter(product =>
      product.category?.toLowerCase().includes(tagQuery.toLowerCase())
    );

    setProducts(filtered);
    setOffset(0);
  };

  return (
    <div className="cf pa2">
      <Search handleSearch={filterTags} />

      <div className="mt2 mb2">
        {products.map((product) => (
          <Card key={product.id} {...product} />
        ))}
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