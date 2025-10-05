import React, { useState, useEffect } from "react";
import { BASE_URL } from '../config';
import Card from './Card'
import Button from './Button'
import Search from './Search'

const CardList = () => {
  // define the limit state variable and set it to 10
  const limit = 10;

  // Define the offset state variable and set it to 0
  const [offset, setOffset] = useState(0);
  // Define the state object for product data
  const [products, setProducts] = useState([]);

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

  const filterTags = (tagQuery) => {
    const filtered = products.filter(product => {
      if (!tagQuery) {
        return product
      }

      return product.tags.find(({ title }) => title === tagQuery)
    })

    setOffset(0)
    setProducts(filtered)
  }


  return (
    <div className="cf pa2">
      <Search handleSearch={filterTags}/>
      <div className="mt2 mb2">
        {products && products.map((product) => (
          <Card key={product.id} {...product} />
        ))}
      </div>

      <div className="flex items-center justify-center pa4">
      <Button text="Previous" handleClick={() => setOffset(offset - limit)} />
      <Button text="Next" handleClick={() => setOffset(offset + limit)} />
      </div>
    </div>
  );
}

export default CardList;