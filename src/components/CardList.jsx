import React, { useEffect, useState } from "react";
import Card from "./Card";
import SearchBar from "./Search";
import Button from "./Button";
import { BASE_URL } from "../config";

const ProductList = () => {
  const pageSize = 10;
  const [start, setStart] = useState(0);
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}/products`)
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setFiltered(data.slice(0, pageSize));
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    setFiltered(products.slice(start, start + pageSize));
  }, [start, products]);

  const filterByTag = (query) => {
    if (!query) {
      setFiltered(products.slice(0, pageSize));
      setStart(0);
      return;
    }
    const result = products.filter(p =>
      p.tags.some(tag => tag.title.toLowerCase().includes(query.toLowerCase()))
    );
    setFiltered(result);
  };

  return (
    <div className="pa3">
      <SearchBar handleSearch={filterByTag} />
      <div>
        {filtered.map(item => <Card key={item._id} {...item} />)}
      </div>
      <div className="flex justify-center mt3">
        <Button text="Back" handleClick={() => setStart(Math.max(0, start - pageSize))} />
        <Button text="Next" handleClick={() => setStart(start + pageSize)} />
      </div>
    </div>
  );
};

export default ProductList;
