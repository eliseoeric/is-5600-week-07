import React, { useState, useEffect } from 'react'
import Card from './Card'
import Button from './Button'
import Search from './Search'
import React, { useState, useEffect } from 'react';
import Card from './Card';
import Button from './Button';
import Search from './Search';
import { BASE_URL } from '../config';

const CardList = ({ data }) => {
  // define the limit state variable and set it to 10
const CardList = ({ data = [] }) => {
  const limit = 10;

  // Define the offset state variable and set it to 0
  const [offset, setOffset] = useState(0);
  // Define the products state variable and set it to the default dataset
  const [products, setProducts] = useState(data);
  const [products, setProducts] = useState(data.slice(0, limit));

  useEffect(() => {
    setProducts(data.slice(offset, offset + limit));
  }, [offset, limit, data])
    fetchProducts();
  }, [offset]);

  const filterTags = (tagQuery) => {
    const filtered = data.filter(product => {
      if (!tagQuery) {
        return product
      }
  const fetchProducts = () => {
    fetch(`${BASE_URL}/products?offset=${offset}&limit=${limit}`)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error fetching products:', error));
  };

      return product.tags.find(({title}) => title === tagQuery)
    })
  const filterTags = (tagQuery) => {
    if (!tagQuery) {
      setProducts(data.slice(0, limit));
      setOffset(0);
      return;
    }

    setOffset(0)
    setProducts(filtered)
  }
    const filtered = data.filter((product) =>
      product.tags.some(({ title }) => title === tagQuery)
    );

    setProducts(filtered);
    setOffset(0);
  };

  return (
    <div className="cf pa2">
      <Search handleSearch={filterTags}/>
      <Search handleSearch={filterTags} />

      <div className="mt2 mb2">
      {products && products.map((product) => (
        {products.map((product) => (
          <Card key={product._id} {...product} />
        ))}
      </div>

      <div className="flex items-center justify-center pa4">
        <Button text="Previous" handleClick={() => setOffset(offset - limit)} />
        <Button text="Next" handleClick={() => setOffset(offset + limit)} />
        <Button 
          text="Previous" 
          handleClick={() => setOffset(Math.max(0, offset - limit))} 
          disabled={offset === 0}
        />
        <Button 
          text="Next" 
          handleClick={() => setOffset(offset + limit)} 
          disabled={products.length < limit} 
        />
      </div>
    </div>
  )
}
  );
};

export default CardList;