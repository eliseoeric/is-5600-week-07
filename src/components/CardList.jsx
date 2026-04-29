import React, { useEffect, useState } from "react";
import Card from "./Card";
import { BASE_URL } from "../config";

const CardList = () => {
  const [products, setProducts] = useState([]);
  const [offset, setOffset] = useState(0);
  const [error, setError] = useState("");
  const limit = 10;

  useEffect(() => {
    console.log("FETCHING FROM:", `${BASE_URL}/products?offset=${offset}&limit=${limit}`);

    fetch(`${BASE_URL}/products?offset=${offset}&limit=${limit}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("PRODUCT DATA:", data);
        setProducts(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        console.error("FETCH ERROR:", err);
        setError("Could not load products");
      });
  }, [offset]);

  return (
    <div>
      <div className="flex justify-between pa3">
        <button onClick={() => setOffset(Math.max(offset - limit, 0))} className="pa2">
          Previous
        </button>

        <button onClick={() => setOffset(offset + limit)} className="pa2">
          Next
        </button>
      </div>

      {error && <p className="red pa3">{error}</p>}

      <p className="pa3">Products loaded: {products.length}</p>

      <div className="cf pa2">
        {products.map((product) => (
          <Card key={product._id || product.id} {...product} />
        ))}
      </div>
    </div>
  );
};

export default CardList;