import React, { useState, useEffect } from 'react'
import Card from './Card'
import Button from './Button'
import Search from './Search'
import { BASE_URL } from '../config'

const CardList = () => {
  const limit = 10;
  const [offset, setOffset] = useState(0);
  const [tag, setTag] = useState('');
  const [products, setProducts] = useState([]);

  const fetchProducts = () => {
    const tagParam = tag ? `&tag=${tag}` : '';
    fetch(`${BASE_URL}/products?offset=${offset}&limit=${limit}${tagParam}`)
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }

  useEffect(() => {
    fetchProducts();
  }, [offset, tag]);

  const handleSearch = (tagQuery) => {
    setOffset(0);
    setTag(tagQuery);
  }

  return (
    <div className="cf pa2">
      <Search handleSearch={handleSearch} />
      <div className="mt2 mb2">
        {products && products.map((product) => (
          <Card key={product._id} {...product} />
        ))}
      </div>
      <div className="flex items-center justify-center pa4">
        <Button text="Previous" handleClick={() => { if (offset > 0) setOffset(offset - limit) }} />
        <Button text="Next" handleClick={() => setOffset(offset + limit)} />
      </div>
    </div>
  )
}

export default CardList;