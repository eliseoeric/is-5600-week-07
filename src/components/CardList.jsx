import React, { useState, useEffect } from "react";
import Card from "./Card";
import Button from "./Button";
import Search from "./Search";
import { BASE_URL } from "../config";

const limit = 10;

const CardList = () => {
  const [offset, setOffset] = useState(0);
  const [products, setProducts] = useState([]);
  const [tagQuery, setTagQuery] = useState("");

  // Fetch products based on offset + tag filter
  const fetchProducts = () => {
    let url = `${BASE_URL}/products?offset=${offset}&limit=${limit}`;

    if (tagQuery) {
      url += `&tag=${tagQuery}`;
    }

    fetch(url)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching products:", err));
  };

  // Fetch products whenever offset/tagQuery changes
  useEffect(() => {
    fetchProducts();
  }, [offset, tagQuery]);

  // Filter by tag from Search component
  const filterTags = (tag) => {
    setTagQuery(tag);
    setOffset(0); // Reset pagination when searching
  };

  const handlePrevious = () => {
    if (offset > 0) setOffset(offset - limit);
  };

  const handleNext = () => {
    setOffset(offset + limit);
  };

  return (
    <div className="cf pa2">
      {/* Search bar */}
      <Search handleSearch={filterTags} />

      {/* Product grid */}
      <div className="mt2 mb2">
        {products.length > 0 ? (
          products.map((product) => (
            <Card key={product._id} {...product} />
          ))
        ) : (
          <div>No products found.</div>
        )}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center pa4">
        <Button text="Previous" handleClick={handlePrevious} />
        <Button text="Next" handleClick={handleNext} />
      </div>
    </div>
  );
};

export default CardList;
