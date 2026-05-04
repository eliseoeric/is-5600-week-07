import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";

function ProductList({ products }) {
  const { addToCart } = useContext(CartContext);

  return (
    <div>
      <h2>Products</h2>
      {products.map((p) => (
        <div key={p.id}>
          <p>{p.name} - ${p.price}</p>
          <button onClick={() => addToCart(p)}>
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
}

export default ProductList;