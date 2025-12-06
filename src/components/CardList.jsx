
import React, { useState, useEffect } from 'react';
import Card from './Card';
import Button from './Button';
import Search from './Search';
import fullProducts from '../data/full-products.json'; // local JSON
import { Link } from 'react-router-dom';

export default function CardList({ data = fullProducts }) {
  const limit = 10;
  const [offset, setOffset] = useState(0);
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState(data);
  const [loading, setLoading] = useState(false);
  const [tagQuery, setTagQuery] = useState('');

  useEffect(() => {
    setLoading(true);

    const term = tagQuery.toLowerCase().trim();
    let newFiltered = data;

    if (term) {
      newFiltered = data.filter((prod) =>
        prod.tags && prod.tags.some((t) => t.title.toLowerCase().includes(term))
      );
    }

    setFiltered(newFiltered);
    setProducts(newFiltered.slice(offset, offset + limit));
    setLoading(false);
  }, [offset, tagQuery, data]);

  const handleSearch = (tag) => {
    setTagQuery(tag);
    setOffset(0);
  };

  const handlePrevious = () => setOffset((prev) => Math.max(prev - limit, 0));
  const handleNext = () =>
    setOffset((prev) => Math.min(prev + limit, Math.max(filtered.length - limit, 0)));

  return (
    <div className="cf pa2">
      <Search handleSearch={handleSearch} />
      <div className="mt2 mb2">
        {loading ? (
          <div>Loading products...</div>
        ) : products.length > 0 ? (
          products.map((product) => <Card key={product._id || product.id} {...product} />)
        ) : (
          <p className="tc w-100">No products found.</p>
        )}
      </div>

      {products.length > 0 && (
        <div className="flex items-center justify-center pa4">
          <Button text="Previous" handleClick={handlePrevious} disabled={offset === 0} />
          <Button text="Next" handleClick={handleNext} disabled={offset + limit >= filtered.length} />
        </div>
      )}
    </div>
  );
}
