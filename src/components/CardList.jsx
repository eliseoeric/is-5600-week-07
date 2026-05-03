import React, { useState, useEffect } from 'react'
import Card from './Card'
import Button from './Button'
import Search from './Search'
// 1. Import BASE_URL from your config file
import { BASE_URL } from '../config';

// 2. Remove { data } from the props since we fetch it now
const CardList = () => {
  const limit = 10;
  const [offset, setOffset] = useState(0);
  const [products, setProducts] = useState([]);

  // 3. Create the fetch function to get data from the Node API
  const fetchProducts = () => {
    fetch(`${BASE_URL}/products?offset=${offset}&limit=${limit}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((err) => console.error("Error fetching products:", err));
  };

  // 4. Update useEffect to call fetchProducts whenever offset changes
  useEffect(() => {
    fetchProducts();
  }, [offset]); // This ensures the API is called again on pagination

  // Note: Search functionality usually requires a server-side route 
  // or fetching all data. For this lab, we focus on the pagination fetch.
  const filterTags = (tagQuery) => {
    fetch(`${BASE_URL}/products?tag=${tagQuery}`)
      .then((res) => res.json())
      .then((data) => {
        setOffset(0);
        setProducts(data);
      });
  }

  return (
    <div className="cf pa2">
      <Search handleSearch={filterTags}/>
      <div className="mt2 mb2">
        {products && products.map((product) => (
          /* 5. Check if your API uses _id or id and match it here */
          <Card key={product._id || product.id} {...product} />
        ))}
      </div>

      <div className="flex items-center justify-center pa4">
        {/* 6. Add logic to prevent negative offset */}
        <Button 
          text="Previous" 
          handleClick={() => setOffset(Math.max(0, offset - limit))} 
        />
        <Button 
          text="Next" 
          handleClick={() => setOffset(offset + limit)} 
        />
      </div>
    </div>
  )
}

export default CardList;