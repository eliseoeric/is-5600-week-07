// src/components/CardList.jsx
import React, { useState, useEffect } from "react";
import { BASE_URL } from "../config";
import Card from "./Card";
import Button from "./Button";
import Search from "./Search";

export default function CardList() {
  const limit = 10;
  const [offset, setOffset] = useState(0);
  const [products, setProducts] = useState([]);

  const fetchProducts = () => {
    fetch(`${BASE_URL}/products?offset=${offset}&limit=${limit}`)
      .then((res) => res.json())
      .then((data) => setProducts(data || []))
      .catch((err) => {
        console.error("fetchProducts error", err);
        setProducts([]);
      });
  };

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offset]);

  const handleSearch = (q) => {
    if (!q) return fetchProducts();
    fetch(`${BASE_URL}/products?offset=0&limit=${limit}&tag=${encodeURIComponent(q)}`)
      .then((res) => res.json())
      .then((data) => {
        setOffset(0);
        setProducts(data || []);
      })
      .catch((err) => console.error("search error", err));
  };

  return (
    <div>
      <Search handleSearch={handleSearch} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 12 }}>
        {products && products.length ? products.map((p) => <Card key={p._id} {...p} />) : <div>No products found</div>}
      </div>

      <div style={{ display: "flex", justifyContent: "center", gap: 12, marginTop: 18 }}>
        <Button text="Previous" handleClick={() => setOffset(Math.max(0, offset - limit))} />
        <Button text="Next" handleClick={() => setOffset(offset + limit)} />
      </div>
    </div>
  );
}
