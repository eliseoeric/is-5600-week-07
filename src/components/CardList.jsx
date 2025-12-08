import React, { useState, useEffect } from "react";
import Card from "./Card";
import Button from "./Button";
import Search from "./Search";

const CardList = ({ data }) => {
  const limit = 10;

  // where we are in the list
  const [offset, setOffset] = useState(0);
  // the products currently being shown
  const [products, setProducts] = useState(data);

  // whenever offset or data changes, recalculate visible products
  useEffect(() => {
    setProducts(data.slice(offset, offset + limit));
  }, [offset, limit, data]);

  const filterTags = (tagQuery) => {
    const trimmed = tagQuery.trim().toLowerCase();

    const filtered = data.filter((product) => {
      if (!trimmed) return true; // show all

      if (!product.tags) return false;

      // check if any tag title includes the search text (case-insensitive)
      return product.tags.some((tag) =>
        tag.title.toLowerCase().includes(trimmed)
      );
    });

    setOffset(0);
    setProducts(filtered);
  };

  const handlePrevious = () => {
    setOffset((current) => Math.max(0, current - limit));
  };

  const handleNext = () => {
    setOffset((current) => current + limit);
  };

  return (
    <div className="cf pa2">
      <Search handleSearch={filterTags} />

      <div className="mt2 mb2">
        {products &&
          products.map((product) => (
            <Card key={product._id} {...product} />
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