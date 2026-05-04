import { useCart } from "../state/CartProvider";

export default function AddToCart({ product }) {
  const { addToCart } = useCart();

  return (
    <a onClick={() => addToCart(product)}>
      Add to Cart
    </a>
  );
}