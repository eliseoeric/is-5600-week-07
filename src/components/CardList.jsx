import React, { useState, useEffect } from "react";
import { BASE_URL } from "../config";
import Card from "./Card";

export default function CardList() {
  const [products, setProducts] = useState([]);
  const [offset, setOffset] = useState(0);
  const limit = 10;

  const fetchProducts = () => {
    fetch(`${BASE_URL}/products?offset=${offset}&limit=${limit}`)
      .then(res => res.json())
      .then(data => setProducts(data));
  };

  useEffect(() => {
    fetchProducts();
  }, [offset]);

  return (
    <div>
      {products.map(p => <Card key={p.id} {...p} />)}
      <button onClick={() => setOffset(offset - limit)}>Previous</button>
      <button onClick={() => setOffset(offset + limit)}>Next</button>
    </div>
  );
}