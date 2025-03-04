import React, { useState, useEffect } from "react";
import { BASE_URL } from "../config";
import Card from "./Card";
import Button from "./Button";
import Search from "./Search";

const CardList = ({ data }) => {
  const limit = 10; // Pagination Limit
  const [offset, setOffset] = useState(0); // Pagination Offset
  const [products, setProducts] = useState([]); // Products Data

  // Fetch Products from API
  const fetchProducts = async () => {
    try {
      const response = await fetch(`${BASE_URL}/products?offset=${offset}&limit=${limit}`);
      const result = await response.json();
      setProducts(result);
    } catch (error) {
      console.error("Failed to fetch products", error);
    }
  };

  // Fetch products whenever offset changes
  useEffect(() => {
    fetchProducts();
  }, [offset]);

  // Filter Products by Tags
  const filterTags = (tagQuery) => {
    if (!tagQuery) {
      fetchProducts();
      return;
    }

    const filtered = data.filter((product) =>
      product.tags.some(({ title }) => title.toLowerCase() === tagQuery.toLowerCase())
    );

    setProducts(filtered);
    setOffset(0); // Reset pagination after filtering
  };

  return (
    <div className="cf pa2">
      <Search handleSearch={filterTags} />
      <div className="mt2 mb2">
        {products.map((product) => (
          <Card key={product.id} {...product} />
        ))}
      </div>

      <div className="flex items-center justify-center pa4">
        {offset > 0 && (
          <Button text="Previous" handleClick={() => setOffset(offset - limit)} />
        )}
        {products.length === limit && (
          <Button text="Next" handleClick={() => setOffset(offset + limit)} />
        )}
      </div>
    </div>
  );
};

export default CardList;
