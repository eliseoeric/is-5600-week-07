import { useContext } from "react";
import { CartContext } from "../context/CartContext";

const Card = ({ product }) => {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="pa3 ma2 ba bw1 b--light-silver w-30">
      <h3>{product.name}</h3>
      <p>${product.price}</p>
      <button
        className="bg-blue white pa2 br2"
        onClick={() => addToCart(product)}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default Card;
