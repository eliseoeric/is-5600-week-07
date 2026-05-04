import React, { useState, useEffect } from 'react';
import Card from './Card';
import Button from './Button';
import Search from './Search';
import { BASE_URL } from '../config';

const CardList = ({ data }) => {
  const limit = 10;

  const [offset, setOffset] = useState(0);
  const [allProducts, setAllProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    setAllProducts(data);
    setProducts(data.slice(0, limit));
  }, [data]);

  const filterTags = (searchText) => {
    const query = searchText.toLowerCase().trim();

    fetch(`${BASE_URL}/products`)
      .then((res) => res.json())
      .then((records) => {
        setAllProducts(records);

        if (!query) {
          setProducts(records.slice(0, limit));
          setMessage('');
          setOffset(0);
          return;
        }

        const filtered = records.filter((product) => {
          const tags =
            product.tags?.map((tag) => tag.title.toLowerCase()).join(' ') || '';

          const description = product.description?.toLowerCase() || '';
          const alt = product.alt_description?.toLowerCase() || '';
          const firstName = product.user?.first_name?.toLowerCase() || '';
          const lastName = product.user?.last_name?.toLowerCase() || '';

          return (
            tags.includes(query) ||
            description.includes(query) ||
            alt.includes(query) ||
            firstName.includes(query) ||
            lastName.includes(query)
          );
        });

        setOffset(0);

        if (filtered.length === 0) {
          setProducts([]);
          setMessage('No products found');
        } else {
          setProducts(filtered);
          setMessage('');
        }
      })
      .catch((err) => {
        console.error(err);
        setMessage('Error fetching products');
      });
  };

  const handlePrevious = (e) => {
    e.preventDefault();
    const newOffset = Math.max(offset - limit, 0);
    setOffset(newOffset);
    setProducts(allProducts.slice(newOffset, newOffset + limit));
  };

  const handleNext = (e) => {
    e.preventDefault();
    const newOffset = offset + limit;

    if (newOffset < allProducts.length) {
      setOffset(newOffset);
      setProducts(allProducts.slice(newOffset, newOffset + limit));
    }
  };

  return (
    <div className="cf pa2">
      <Search filter={filterTags} />

      {message && <p className="tc f4 gray">{message}</p>}

      <div className="mt2 mb2">
        {products.map((product) => (
          <Card key={product._id || product.id} {...product} />
        ))}
      </div>

      <div className="flex items-center justify-center pa4">
        <Button text="Previous" handleClick={handlePrevious} />
        <Button text="Next" handleClick={handleNext} />
      </div>
    </div>
  );
};

export default CardList;