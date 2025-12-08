import { useContext } from "react";
import { ProductContext } from "../context/ProductContext";

export default function ProductList() {
  const { products, addToCart } = useContext(ProductContext);

  return (
    <div>
      <h2>Products</h2>
      {products.map((p) => (
        <div
          key={p.id}
          style={{ border: "1px solid black", margin: 10, padding: 10 }}
        >
          <p>{p.name}</p>
          <p>${p.price}</p>
          <button onClick={() => addToCart(p)}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
}
