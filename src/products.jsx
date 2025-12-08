import { useContext } from "react";
import { StoreContext } from "../context/StoreContext";

export default function Products() {
  const { products, addToCart } = useContext(StoreContext);

  return (
    <div>
      <h2>Products</h2>

      {products.map((product) => (
        <div
          key={product.id}
          className="ba b--light-gray pa3 mv2 br3 flex justify-between"
        >
          <div>
            <p className="b">{product.title}</p>
            <p>${product.price}</p>
          </div>

          <button
            className="bg-blue white pa2 br2 pointer"
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
}
