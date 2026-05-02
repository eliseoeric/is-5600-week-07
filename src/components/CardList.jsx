import React, { useState, useEffect } from 'react';
import { BASE_URL } from '../config';

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

const CardList = () => {
  const [products, setProducts] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const limit = 4;

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

  useEffect(() => {
    fetchProducts();
  }, [offset]);

  if (loading) {
    return <div className="tc pa4 f3">Loading products...</div>;
  }

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
      <div className="mt2 mb2 flex flex-wrap justify-center">
        {products.map((product) => (
          <Card key={product.id} {...product} />
        ))}
      </div>
      <div className="flex items-center justify-center pa4">
        <Button text="Previous" handleClick={() => setOffset(Math.max(0, offset - limit))} />
        <Button text="Next" handleClick={() => setOffset(offset + limit)} />
        <span className="ml3 gray">Page {offset/limit + 1}</span>
      </div>
    </div>
  );
};

export default CardList;