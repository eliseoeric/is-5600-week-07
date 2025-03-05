import { useCart } from "../state/CartProvider";

export default function OrderButton({product}) {

    // Import the AddToCart function from the CartContext
    const { AddToCart } = useCart();

    const handleClick = (product) => {
      console.log("Adding to cart", product)
      AddToCart(product)
    }

    return (
      <a className="f6 link dim br3 ba bw1 ph3 pv2 mb2 dib black" onClick={() => handleClick(product)}>Add to Cart</a>
    )
}