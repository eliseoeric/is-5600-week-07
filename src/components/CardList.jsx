import React, { useState, useEffect } from 'react'
import Card from './Card'
import Button from './Button'
import Search from './Search'
import { BASE_URL } from '../config'

const CardList = () => {
  const limit = 10;

  const [offset, setOffset] = useState(0);
  const [products, setProducts] = useState();

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
    const filtered = data.filter(product => {
      if (!tagQuery) {
        return product
      }

      return product.tags.find(({ title }) => title === tagQuery)
    })

    setOffset(0)
    setProducts(filtered)
  }

  const handlePrevious = () => {
    setOffset((prev) => prev - limit)
  }

  const handleNext = () => {
    setOffset((prev) => prev + limit)
  }


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
