// Header.js

// ...
import { useCart } from '../state/CartProvider';

const Header = () => {
  // Import the cart state from the CartContext
  const { cartItems } = useCart();
  // Use the reduce function to calculate the total number of items in the cart
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // ...
}

export default function OrderButton({product}) {
  
    // Import the addToCart function from the CartContext
    const { addToCart } = useContext(CartContext);
  
    const handleClick = (product) => {
      console.log("Adding to cart", product)
      addToCart(product)
    }
  
    return (
      <a className="f6 link dim br3 ba bw1 ph3 pv2 mb2 dib black" onClick={() => handleClick(product)}>Add to Cart</a>
    )
  }