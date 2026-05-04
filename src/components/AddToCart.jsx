import { useCart } from "../state/CartProvider";

export default function AddToCart({ product }) {
  const { addToCart } = useCart();

  return (
    <button onClick={() => addToCart(product)}>
      Add to Cart
    </button>
  );
}