import React, { useState, useEffect } from 'react';
import Card from './Card';
import Button from './Button';
import Search from './Search';
import { useCart } from '../state/CartProvider';

const CardList = ({ products }) => {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const { addToCart } = useCart();

  const filterTags = (tagQuery) => {
    const filtered = products.filter((product) => {
      if (!tagQuery) return product;
      return product.tags.find(({ title }) => title === tagQuery);
    });
    setFilteredProducts(filtered);
  };

  return (
    <div className="cf pa2">
      <Search handleSearch={filterTags} />
      <div className="mt2 mb2">
        {filteredProducts.map((product) => (
          <Card key={product._id} {...product} />
        ))}
      </div>
      <div className="flex items-center justify-center pa4">
        <Button text="Previous" handleClick={() => setOffset(offset - limit)} />
        <Button text="Next" handleClick={() => setOffset(offset + limit)} />
      </div>
    </div>
  );
};

export default CardList;
