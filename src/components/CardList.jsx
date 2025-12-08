// src/components/CardList.jsx
import React, { useEffect, useState, useCallback } from "react";
import Button from "./Button.jsx";
import Card from "./Card.jsx";
import Search from "./Search.jsx";
import { BASE_URL } from "../config";

const limit = 12;

export default function CardList() {
  const [offset, setOffset] = useState(0);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [tagQuery, setTagQuery] = useState("");

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const params = new URLSearchParams({
        offset: String(offset),
        limit: String(limit),
      });
      if (tagQuery) params.set("tag", tagQuery);

      const res = await fetch(`${BASE_URL}/products?${params.toString()}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setProducts(data || []);
    } catch (err) {
      console.error("Fetch products failed:", err);
      setError("Could not load products from the API.");
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [offset, tagQuery]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handlePage = (delta) => {
    setOffset((prev) => Math.max(0, prev + delta * limit));
  };

  const handleSearch = (text) => {
    setOffset(0);
    setTagQuery(text.trim());
  };

  return (
    <div className="cf pa2">
      <Search handleSearch={handleSearch} />

      {loading && <p className="pa3">Loading…</p>}
      {error && <p className="pa3 dark-red">{error}</p>}
      {!loading && !error && products.length === 0 && (
        <p className="pa3">No products found.</p>
      )}

      <div className="mt2 mb2">
        {products.map((p) => (
          <Card key={p._id || p.id} {...p} />
        ))}
      </div>

      <div className="flex items-center justify-center pa4">
        <Button text="Previous" handleClick={() => handlePage(-1)} />
        <span className="mh3">Page {Math.floor(offset / limit) + 1}</span>
        <Button
          text="Next"
          handleClick={() => handlePage(1)}
          // optionally disable Next when API returns less than a full page
          disabled={products.length < limit}
        />
      </div>
    </div>
  );
}
