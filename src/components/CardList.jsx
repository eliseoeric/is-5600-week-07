import React, { useState, useEffect } from 'react';
import Card from './Card';
import Button from './Button';
import Search from './Search';
import { BASE_URL } from '../config';

const CardList = () => {
  const limit = 10;
  const [offset, setOffset] = useState(0);
  const [allProducts, setAllProducts] = useState([]);       // full product list
  const [displayedProducts, setDisplayedProducts] = useState([]); // paginated/filtered view

  // Fetch all products once on mount
  useEffect(() => {
    fetch(`${BASE_URL}/products`)
      .then((res) => res.json())
      .then((data) => {
        setAllProducts(data);
        setDisplayedProducts(data.slice(0, limit));
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  // Update displayed products when offset changes
  useEffect(() => {
    setDisplayedProducts(allProducts.slice(offset, offset + limit));
  }, [offset, allProducts]);

  // Filter by tag title (client-side)
  const filterTags = (tagQuery) => {
    if (!tagQuery) {
      setDisplayedProducts(allProducts.slice(0, limit));
      setOffset(0);
      return;
    }

    const filtered = allProducts.filter(product =>
      product.tags.some(tag =>
        tag.title.toLowerCase().includes(tagQuery.toLowerCase())
      )
    );

    setDisplayedProducts(filtered);
    setOffset(0);
  };

  return (
    <div className="cf pa2">
      <Search handleSearch={filterTags} />
      <div className="mt2 mb2">
        {displayedProducts.map((product) => (
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