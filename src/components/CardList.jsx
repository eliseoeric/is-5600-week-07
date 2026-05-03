import React, { useState, useEffect } from 'react'
import Card from './Card'
import Button from './Button'
import Search from './Search'
import { BASE_URL } from '../config'

const CardList = ({ onAddToCart }) => {
  const limit = 10;
  const [offset, setOffset] = useState(0);
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${BASE_URL}/products`);
        if (!response.ok) {
          throw new Error(`Failed to load products: ${response.status}`);
        }
        const data = await response.json();
        const productData = Array.isArray(data) ? data : data?.products ?? [];
        setAllProducts(productData);
        setFilteredProducts(productData);
        setError(null);
      } catch (error) {
        console.error(error);
        setAllProducts([]);
        setFilteredProducts([]);
        setError('Unable to load products from the API.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    setProducts(Array.isArray(filteredProducts) ? filteredProducts.slice(offset, offset + limit) : []);
  }, [filteredProducts, offset]);

  const filterTags = (tagQuery) => {
    const filtered = allProducts.filter((product) => {
      if (!tagQuery) {
        return true;
      }
      return product.tags?.some(({ title }) => title === tagQuery);
    });

    setOffset(0);
    setFilteredProducts(filtered);
  }

  const handlePrevious = () => {
    setOffset((prevOffset) => Math.max(prevOffset - limit, 0));
  };

  const handleNext = () => {
    setOffset((prevOffset) => Math.min(prevOffset + limit, Math.max(filteredProducts.length - limit, 0)));
  };

  return (
    <div className="cf pa2">
      <Search filter={filterTags} />
      {loading ? (
        <p>Loading products...</p>
      ) : error ? (
        <p className="red">{error}</p>
      ) : (
        <>
          <div className="mt2 mb2">
            {products.length === 0 ? (
              <p>No products available.</p>
            ) : (
              products.map((product) => (
                <Card key={product.id || product._id} product={product} onAddToCart={onAddToCart} />
              ))
            )}
          </div>

          <div className="flex items-center justify-center pa4">
            <Button text="Previous" handleClick={handlePrevious} />
            <Button text="Next" handleClick={handleNext} />
          </div>
        </>
      )}
    </div>
  )
}

export default CardList;
