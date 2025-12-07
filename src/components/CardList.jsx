import React, { useState, useEffect } from "react";
import Card from "./Card";
import Button from "./Button";
import Search from "./Search";
import { BASE_URL } from "../config";

const CardList = () => {
  const limit = 10;

  const [offset, setOffset] = useState(0);
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);

  // Fetch ALL products once (used for search filtering)
  const fetchAllProducts = async () => {
    const res = await fetch(`${BASE_URL}/products`);
    const data = await res.json();
    setAllProducts(data);
  };

  // Fetch paginated products from server
  const fetchProducts = async () => {
    const res = await fetch(
      `${BASE_URL}/products?offset=${offset}&limit=${limit}`
    );
    const data = await res.json();
    setProducts(data);
  };

  // Load full list ONCE (for searching)
  useEffect(() => {
    fetchAllProducts();
  }, []);

  // Fetch paginated products whenever offset changes
  useEffect(() => {
    fetchProducts();
  }, [offset]);

  // Search filter
  const filterTags = (tagQuery) => {
    if (!tagQuery) {
      // Reset to paginated API results
      fetchProducts();
      return;
    }

    const filtered = allProducts.filter((product) =>
      product.tags?.some((tag) => tag.title === tagQuery)
    );

    setProducts(filtered);
    setOffset(0); // reset pagination
  };

  return (
    <div className="cf pa2">
      <Search handleSearch={filterTags} />

      <div className="mt2 mb2">
        {products &&
          products.map((product) => (
            <Card key={product.id} {...product} />
          ))}
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
