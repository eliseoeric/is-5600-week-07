import React, { useState, useEffect } from 'react'
import Card from './Card'
import Button from './Button'
import Search from './Search'
import { BASE_URL } from '../config';

const CardList = () => {
  // define the limit state variable and set it to 10
  const limit = 10;

  // Define the offset state variable and set it to 0
  const [offset, setOffset] = useState(0);
  // Define the products state variable and set it to the default dataset
  const [products, setProducts] = useState([]);

  // Create a function to fetch the products
  const fetchProducts = () => {
    fetch(`${BASE_URL}/products?offset=${offset}&limit=${limit}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      });
  }
  
  // Update the `useEffect` to monitor the `offset` state variable
  useEffect(() => {
   fetchProducts();
  }, [offset]);

  const filterTags = (tagQuery) => {
    // Update this to use the API's filtering capabilities if available
    // For now, we'll just reset and fetch again if no tag is provided
    if (!tagQuery) {
      setOffset(0);
      fetchProducts();
      return;
    }

    // Otherwise, filter locally with the current data
    fetch(`${BASE_URL}/products?tag=${tagQuery}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setOffset(0);
      });
  }

  const handlePrevious = () => {
    setOffset(Math.max(0, offset - limit));
  }

  const handleNext = () => {
    setOffset(offset + limit);
  }

  return (
    <div className="cf pa2">
      <Search handleSearch={filterTags}/>
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