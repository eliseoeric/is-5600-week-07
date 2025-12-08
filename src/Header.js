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