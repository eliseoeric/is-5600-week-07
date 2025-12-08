import { useCart } from "../state/CartProvider.jsx";

export default function AddToCart({ product }) {
  const { addToCart } = useCart();
  return (
    <button
      className="f6 link dim br2 ba ph3 pv2 black bg-white"
      type="button"
      onClick={() => addToCart(product)}
    >
      Add to Cart
    </button>
  );
}
