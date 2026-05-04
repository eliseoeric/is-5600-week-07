import React, { useState, useEffect } from 'react'
import Card from './Card'
import Button from './Button'
import Search from './Search'

const CardList = ({ data }) => {
  // define the limit state variable and set it to 10
  const limit = 10;
import React, { useState, useEffect } from 'react'
import Card from './Card'
import Button from './Button'
import Search from './Search'
import React, { useState, useEffect } from 'react';
import { BASE_URL } from '../config';

const CardList = ({ data }) => {
  // define the limit state variable and set it to 10
  const limit = 10;
// Simple Card component
const Card = ({ name, description, price }) => {
  return (
    <div className="ba b--black-10 br2 ma3 pa3 w5 shadow-5">
      <div className="f4 b">{name}</div>
      <div className="f5 gray mt2">{description}</div>
      <div className="f3 green mt3">${price}</div>
      <button className="bg-blue white bn br2 pa2 mt3 pointer">
        Add to Cart
      </button>
    </div>
  );
};

// Button component
const Button = ({ text, handleClick }) => {
  return (
    <button 
      className="f6 link dim br3 ba bw1 ph3 pv2 mb2 dib black pointer bg-white ma2"
      onClick={handleClick}
    >
      {text}
    </button>
  );
};

  // Define the offset state variable and set it to 0
const CardList = () => {
  const [products, setProducts] = useState([]);
  const [offset, setOffset] = useState(0);
  // Define the products state variable and set it to the default dataset
  const [products, setProducts] = useState(data);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const limit = 4;

  useEffect(() => {
    setProducts(data.slice(offset, offset + limit));
  }, [offset, limit, data])
  const fetchProducts = () => {
    setLoading(true);
    setError(null);
    const url = `${BASE_URL}/products?offset=${offset}&limit=${limit}`;
    console.log('Fetching from:', url);

    fetch(url)
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        console.log('Got products:', data);
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Fetch error:', err);
        setError(err.message);
        setLoading(false);
      });
  };

  const filterTags = (tagQuery) => {
    const filtered = data.filter(product => {
      if (!tagQuery) {
        return product
      }
  useEffect(() => {
    fetchProducts();
  }, [offset]);

      return product.tags.find(({title}) => title === tagQuery)
    })
  if (loading) {
    return <div className="tc pa4 f3">Loading products...</div>;
  }

    setOffset(0)
    setProducts(filtered)
  if (error) {
    return (
      <div className="tc pa4">
        <div className="red f4">Error: {error}</div>
        <div className="gray mt2">Backend URL: {BASE_URL}</div>
        <button 
          className="bg-blue white bn pa2 mt3 pointer"
          onClick={fetchProducts}
        >
          Retry
        </button>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="tc pa4">
        <div>No products found</div>
        <button 
          className="bg-blue white bn pa2 mt3 pointer"
          onClick={fetchProducts}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="cf pa2">
      <Search handleSearch={filterTags}/>
      <div className="mt2 mb2">
      {products && products.map((product) => (
          <Card key={product._id} {...product} />
      <div className="mt2 mb2 flex flex-wrap justify-center">
        {products.map((product) => (
          <Card key={product.id} {...product} />
        ))}
      </div>

      <div className="flex items-center justify-center pa4">
        <Button text="Previous" handleClick={() => setOffset(offset - limit)} />
        <Button text="Previous" handleClick={() => setOffset(Math.max(0, offset - limit))} />
        <Button text="Next" handleClick={() => setOffset(offset + limit)} />
        <span className="ml3 gray">Page {offset/limit + 1}</span>
      </div>
    </div>
  )
}
  );
};

export default CardList;
  // Define the offset state variable and set it to 0
  const [offset, setOffset] = useState(0);
  // Define the products state variable and set it to the default dataset
  const [products, setProducts] = useState(data);

  useEffect(() => {
    setProducts(data.slice(offset, offset + limit));
  }, [offset, limit, data])

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