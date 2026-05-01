import React, { useState, useEffect } from 'react'
import Card from './Card'
import Button from './Button'
import Search from './Search'
import { BASE_URL } from '../config'

const CardList = () => {
  const limit = 10;
  const [offset, setOffset] = useState(0);
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);

  const fetchProducts = () => {
    fetch(`${BASE_URL}/products?offset=${offset}&limit=${limit}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      });
  };

  // Fetch all products once for tag filtering
  const fetchAllProducts = () => {
    fetch(`${BASE_URL}/products`)
      .then((res) => res.json())
      .then((data) => {
        setAllProducts(data);
      });
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  useEffect(() => {
    if (!isFiltered) {
      fetchProducts();
    }
  }, [offset, isFiltered]);

  const filterTags = (tagQuery) => {
    if (!tagQuery) {
      // Clear filter, go back to paginated API results
      setIsFiltered(false);
      setOffset(0);
      return;
    }

    const filtered = allProducts.filter(product =>
      product.tags.find(({ title }) => title === tagQuery)
    );

    setIsFiltered(true);
    setOffset(0);
    setProducts(filtered);
  };

  const handlePrevious = () => {
    setOffset((prev) => Math.max(0, prev - limit));
  };

  const handleNext = () => {
    setOffset((prev) => prev + limit);
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
  )
}

export default CardList;