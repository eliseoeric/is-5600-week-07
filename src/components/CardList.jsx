import React, { useEffect, useState } from 'react';
import Card from './Card';
import Button from './Button';
import Search from './Search';
import { BASE_URL } from '../config';

const limit = 10;

const CardList = () => {
  const [offset, setOffset] = useState(0);
  const [products, setProducts] = useState([]);
  const [searchTag, setSearchTag] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const query = searchTag ? `&tag=${encodeURIComponent(searchTag)}` : '';
        const data = await fetch(
          `${BASE_URL}/products?offset=${offset}&limit=${limit}${query}`
        ).then((res) => res.json());
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products', error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [offset, searchTag]);

  const filterTags = (tagQuery) => {
    setSearchTag(tagQuery);
    setOffset(0);
  };

  return (
    <div className="cf pa2">
      <Search filter={filterTags} />
      <div className="mt2 mb2">
        {loading && <div className="tc pv3">Loading products...</div>}
        {!loading &&
          products &&
          products.map((product) => <Card key={product._id} {...product} />)}
      </div>

      <div className="flex items-center justify-center pa4">
        <Button
          text="Previous"
          handleClick={() => setOffset(Math.max(0, offset - limit))}
        />
        <Button text="Next" handleClick={() => setOffset(offset + limit)} />
      </div>
    </div>
  );
};

export default CardList;