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

  const filterTags = (tagQuery) => {
    const filtered = data.filter(product => {
      if (!tagQuery) {
        return product
      }
      return product.tags.find(({title}) => title === tagQuery)
    })
    setOffset(0)
    setProducts(filtered)
  }

    // Create a function to fetch the products
    const fetchProducts = () => {
      fetch(`${BASE_URL}/products?offset=${offset}&limit=${limit}`)
        .then((res) => res.json())
        .then((data) => {
          setProducts(data);
        });
    }

    useEffect(() => {
      fetchProducts();
    }, [offset]);

  return (
    <div className="cf pa2">
      <Search handleSearch={filterTags}/>
      <div className="mt2 mb2">
      {products && products.map((product) => (
          <Card key={product._id} {...product} />
        ))}
      </div>
      <div className="flex items-center justify-center pa4">
        <Button text="Previous" handleClick={() => setOffset(offset - limit)} />
        <Button text="Next" handleClick={() => setOffset(offset + limit)} />
      </div>
    </div>
  )
}
export default CardList;