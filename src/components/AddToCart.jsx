import { useCart } from "../state/CartProvider";

export default function OrderButton({ product }) {
  // Import the addToCart function from the CartContext
  const { addToCart } = useCart();

  const handleClick = () => {
    console.log("Adding to cart", product);
    addToCart(product);
  };

  return (
    <button 
      className="f6 link dim br3 ba bw1 ph3 pv2 mb2 dib black bg-white pointer" 
      onClick={handleClick}
    >
      Add to Cart
    </button>
  );
}
