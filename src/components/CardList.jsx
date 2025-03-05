import React, { useState, useEffect } from 'react';
import Card from './Card';
import Button from './Button';
import Search from './Search';
import { BASE_URL } from '../config';

const CardList = () => {
  const limit = 10;
  const [offset, setOffset] = useState(0);
  const [products, setProducts] = useState([]);

  // ✅ Fix: Use `products` instead of `data` in the filter function
  const filterTags = (tagQuery) => {
    const filtered = products.filter((product) => {
      if (!tagQuery) {
        return true; // ✅ Return all products if no tag is provided
      }
      return product.tags && product.tags.some(({ title }) => title === tagQuery);
    });

    setOffset(0);
    setProducts(filtered);
  };

  // ✅ Fix: Add console.log() to debug API response
  const fetchProducts = () => {
    fetch(`${BASE_URL}/products?offset=${offset}&limit=${limit}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched Products:", data); // ✅ Debugging
        setProducts(data);
      })
      .catch((err) => console.error("Error fetching products:", err)); // ✅ Handle errors
  };

  useEffect(() => {
    fetchProducts();
  }, [offset]);

  return (
    <div className="cf pa2">
      <Search handleSearch={filterTags} />
      <div className="mt2 mb2">
        {products.length > 0 ? (
          products.map((product) => <Card key={product._id} {...product} />)
        ) : (
          <p>No products available.</p> // ✅ Show message if no products are fetched
        )}
      </div>

      <div className="flex items-center justify-center pa4">
        <Button text="Previous" handleClick={() => setOffset(Math.max(0, offset - limit))} />
        <Button text="Next" handleClick={() => setOffset(offset + limit)} />
      </div>
    </div>
  );
};

export default CardList;
