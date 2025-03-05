// src/components/CardList.js (or similar component)

import React, { useState, useEffect } from 'react';

const CardList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch data from the backend
    fetch('http://localhost:5000/products')  // Make sure the URL is correct
      .then((response) => response.json())  // Convert response to JSON
      .then((data) => {
        console.log('Fetched products:', data);  // Log the fetched data to the console
        setProducts(data);  // Set the products data in state
      })
      .catch((error) => console.error('Error fetching products:', error));  // Handle errors
  }, []);  // The empty array ensures this runs only on component mount

  return (
    <div>
      <h1>Product List</h1>
      {products.length === 0 ? (
        <p>Loading...</p>  // Display loading message until data is fetched
      ) : (
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              {product.name} - ${product.price}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CardList;
