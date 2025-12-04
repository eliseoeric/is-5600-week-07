import React, { useState, useEffect } from "react";
import { BASE_URL } from "../config";
import Card from "./Card";
import Button from "./Button";
import Search from "./Search";

const CardList = () => {
  // Number of products per page
  const limit = 10;

  // Pagination offset
  const [offset, setOffset] = useState(0);

  // Products from the API
  const [products, setProducts] = useState([]);

  // Fetch products from Node API with limit & offset
  const fetchProducts = () => {
    fetch(`${BASE_URL}/products?offset=${offset}&limit=${limit}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((err) => console.error("Error fetching products:", err));
  };

  // Re-fetch products when offset changes
  useEffect(() => {
    fetchProducts();
  }, [offset]);

  // Tag filter (client-side filtering)
  const filterTags = (tagQuery) => {
    if (!tagQuery) {
      // If no tag selected, reload products from server
      fetchProducts();
      return;
    }

    const filtered = products.filter((product) =>
      product.tags?.find(({ title }) => title === tagQuery)
    );

    setOffset(0);
    setProducts(filtered);
  };

  return (
    <div className="cf pa2">
      <Search handleSearch={filterTags} />

      <div className="mt2 mb2">
        {products &&
          products.map((product) => (
            <Card key={product._id || product.id} {...product} />
          ))}
      </div>

      <div className="flex items-center justify-center pa4">
        <Button
          text="Previous"
          handleClick={() => setOffset(Math.max(offset - limit, 0))}
        />
        <Button text="Next" handleClick={() => setOffset(offset + limit)} />
      </div>
    </div>
  );
};

export default CardList;
