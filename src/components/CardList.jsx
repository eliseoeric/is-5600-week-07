import React, { useState, useEffect } from 'react';
import { BASE_URL } from '../config';
import Card from './Card';
import Button from './Button';
import Search from './Search';

const CardList = () => {
  // Define the limit state variable and set it to 10
  const limit = 10;

  // Define the offset state variable and set it to 0
  const [offset, setOffset] = useState(0);
  
  // Define the state object for product data
  const [products, setProducts] = useState([]);
  
  // Define state for search filter
  const [searchQuery, setSearchQuery] = useState('');

  // Create a function to fetch the products
  const fetchProducts = async () => {
    try {
      const response = await fetch(`${BASE_URL}/products?offset=${offset}&limit=${limit}`);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  // Use the useEffect hook to fetch the products when the component boots
  useEffect(() => {
    fetchProducts();
  }, [offset]);

  const handlePrevious = () => {
    if (offset > 0) {
      setOffset(offset - limit);
    }
  };

  const handleNext = () => {
    setOffset(offset + limit);
  };

  const filterTags = (tagQuery) => {
    setSearchQuery(tagQuery);
    setOffset(0);
  };

  // Filter products based on search query
  const filteredProducts = searchQuery 
    ? products.filter(product => 
        product.tags && product.tags.some(tag => 
          tag.title && tag.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
      )
    : products;

  return (
    <div className="cf pa2">
      <Search filter={filterTags} />
      <div className="mt2 mb2">
        {filteredProducts && filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <Card key={product._id} {...product} />
          ))
        ) : (
          <div className="pa4 tc gray">
            <p className="f4">No products found</p>
          </div>
        )}
      </div>

      <div className="flex items-center justify-center pa4">
        <Button text="Previous" handleClick={handlePrevious} />
        <Button text="Next" handleClick={handleNext} />
      </div>
    </div>
  );
};

export default CardList;