import React, { useState, useEffect } from "react";
import { BASE_URL } from '../config';
import Card from './Card'
import Button from './Button'
import Search from './Search'


const CardList = ({}) => {
  // ...
  const limit = 10;

  // Define the state object for product data
  const [products, setProducts] = useState([]);
  // Define the offset state variable and set it to 0
  const [offset, setOffset] = useState(0);
  
  const handlePrevious = () => {
    // set the offset to the previous 10 products
    setOffset(offset - limit);
  }

  // Define the handleNext function
  const handleNext = () => {
    // set the offset to the next 10 products
    setOffset(offset + limit);
  }

  const filterTags = (tag) => {
    const filtered = data.filter(product => {
      if (!tag) {
        return product
      }

      return product.tags.find(({ title }) => title === tag)
    })

    setOffset(0)
    setProducts(filtered)
  }

  // const getPaginatedProducts = () => {
  //   return products.slice(offset, offset + limit);
  // }
  
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
  // Update the return method to use the `products` state object
  return (
    <div className="cf pa2">
      <div className="mt2 mb2">
        {products && products.map((product) => (
          <Card key={product.id || product.firstName } {...product} />
        ))}
      </div>
      <div className="flex items-center justify-center pa4">
        <Button text="Previous" handleClick={handlePrevious} />
        <Button text="Next" handleClick={handleNext} />
      </div>
    </div>
  );
}

export default CardList;