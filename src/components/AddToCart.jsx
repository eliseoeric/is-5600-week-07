import { useCart } from "../state/CartProvider";
import { useContext } from "react";

export default function AddToCart({ product }) {  // ✅ Fix name here

    const { addToCart } = useCart();  // ✅ Correct way to access cart functions

    const handleClick = () => {
      console.log("Adding to cart", product);
      addToCart(product);
    };

    return (
      <button className="f6 link dim br3 ba bw1 ph3 pv2 mb2 dib black" onClick={handleClick}>
        Add to Cart
      </button>
    );
}
