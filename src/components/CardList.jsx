import React, { useState, useEffect } from 'react'
import Card from './Card'
import Button from './Button'
import Search from './Search'
// 1. Import BASE_URL from your config file
import { BASE_URL } from '../config';

const CardList = ({ data }) => {
  // define the limit state variable and set it to 10
// 2. Remove { data } from the props since we fetch it now
const CardList = () => {
  const limit = 10;

  // Define the offset state variable and set it to 0
  const [offset, setOffset] = useState(0);
  // Define the products state variable and set it to the default dataset
  const [products, setProducts] = useState(data);
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
    setProducts(data.slice(offset, offset + limit));
  }, [offset, limit, data])
    fetchProducts();
  }, [offset]); // This ensures the API is called again on pagination

  // Note: Search functionality usually requires a server-side route 
  // or fetching all data. For this lab, we focus on the pagination fetch.
  const filterTags = (tagQuery) => {
    const filtered = data.filter(product => {
      if (!tagQuery) {
        return product
      }

      return product.tags.find(({title}) => title === tagQuery)
    })

    setOffset(0)
    setProducts(filtered)
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
          <Card key={product._id} {...product} />
        {products && products.map((product) => (
          /* 5. Check if your API uses _id or id and match it here */
          <Card key={product._id || product.id} {...product} />
        ))}
      </div>

      <div className="flex items-center justify-center pa4">
        <Button text="Previous" handleClick={() => setOffset(offset - limit)} />
        <Button text="Next" handleClick={() => setOffset(offset + limit)} />
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