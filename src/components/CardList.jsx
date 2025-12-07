import React, { useEffect, useState } from "react";
import Card from "./Card";
import Button from "./Button";
import Search from "./Search";

const CardList = ({ data }) => {
  const pageSize = 10;
  const [offset, setOffset] = useState(0);
  const [visible, setVisible] = useState(data);

  useEffect(() => {
    setVisible(data.slice(offset, offset + pageSize));
  }, [data, offset, pageSize]);

  const handleTagFilter = (tag) => {
    const result = data.filter((product) => {
      if (!tag) return true;
      return product.tags?.some(({ title }) => title === tag);
    });

    setOffset(0);
    setVisible(result);
  };

  const handlePrev = () => {
    setOffset((current) => Math.max(0, current - pageSize));
  };

  const handleNext = () => {
    setOffset((current) =>
      current + pageSize < data.length ? current + pageSize : current
    );
  };

  return (
    <div className="cf pa2">
      <Search handleSearch={handleTagFilter} />

      <div className="mt2 mb2 cf">
        {visible?.map((product) => (
          <Card key={product._id} {...product} />
        ))}
      </div>

      <div className="flex items-center justify-center pa4">
        <Button text="Previous" handleClick={handlePrev} />
        <Button text="Next" handleClick={handleNext} />
      </div>
    </div>
  );
};

export default CardList;
