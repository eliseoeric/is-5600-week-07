// CardList.js
import React, { useState, useEffect } from "react";
import { BASE_URL } from '../config';

// Remove the `data` prop - we won't use that anymore
const CardList = ({}) => {

  // ...

  // Define the state object for product data
  const [products, setProducts] = useState([]);

  // Create a function to fetch the products
  const fetchProducts = () => {
    fetch(`${BASE_URL}/products`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      });
  };

  // Use the useEffect hook to fetch the products when the component boots
  useEffect(() => {
    fetchProducts();
  }, []);

  // Update the return method to use the `products` state object
  return (
    <div className="cf pa2">
      <div className="mt2 mb2">
        {products && products.map((product) => (
          <Card key={product.id} {...product} />
        ))}
      </div>

      <div className="flex items-center justify-center pa4">
        <Button text="Previous" handleClick={handlePrevious} />
        <Button text="Next" handleClick={handleNext} />
      </div>
    </div>
  );

}// CardList.js

  // Update fetch projects to include the limit and offset parameters
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