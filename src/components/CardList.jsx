import React, { useState, useEffect } from 'react'
import Card from './Card'
import Button from './Button'
import { BASE_URL } from '../config'

const limit = 10;

const CardList = () => {
  const [offset, setOffset] = useState(0);
  const [products, setProducts] = useState([]);

  const fetchProducts = () => {
    fetch(`${BASE_URL}/products?offset=${offset}&limit=${limit}`)
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }

  useEffect(() => {
    fetchProducts();
  }, [offset]);

  return (
    <div className="cf pa2">
      <div className="mt2 mb2">
        {products && products.map((product) => (
          <Card key={product._id} {...product} />
        ))}
      </div>
      <div className="flex items-center justify-center pa4">
        <Button text="Previous" handleClick={() => setOffset(Math.max(0, offset - limit))} />
        <Button text="Next" handleClick={() => setOffset(offset + limit)} />
      </div>
    </div>
  )
}

export default CardList;
