import { useContext } from "react";
import { ProductContext } from "../context/ProductContext";

export default function ProductList() {
  const { products, error, addToCart } = useContext(ProductContext);

  if (error) return <div>{error}</div>;
  if (!products.length) return <div>Loading...</div>;

  return (
    <div>
      {products.map((p) => (
        <div key={p.id} style={{border:"1px solid #ddd", padding:"10px", margin:"8px 0"}}>
          <h3>{p.name}</h3>
          <p>${p.price}</p>
          <button onClick={() => addToCart(p)}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
}
