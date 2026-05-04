import { useEffect, useState } from "react";
import Card from "./Card";
import Button from "./Button";
import { BASE_URL } from "../config";

export default function CardList() {
  const limit = 10;
  const [offset, setOffset] = useState(0);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}/products?offset=${offset}&limit=${limit}`)
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, [offset]);

  return (
    <div className="pa3">
      <div className="cf">
        {products.map((product) => (
          <Card key={product._id} {...product} />
        ))}
      </div>

      <div className="tc pa4">
        <Button
          text="Previous"
          handleClick={() => {
            if (offset > 0) setOffset(offset - limit);
          }}
        />

        <Button
          text="Next"
          handleClick={() => {
            setOffset(offset + limit);
          }}
        />
      </div>
    </div>
  );
}