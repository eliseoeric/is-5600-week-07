import React, { useContext } from 'react'; // Import React and the useContext hook to access the CartContext
import { CartContext } from '../state/CartProvider'; // Import CartContext to get access to the cart state and actions

/**
 * AddToCart Component:
 * This component renders a button that allows users to add a product to the cart.
 * It uses the `CartContext` to access the `addToCart` function for adding the selected product to the cart.
 * 
 * Props:
 * - product: The product object that should be added to the cart.
 */
export default function AddToCart({ product }) {
  // Access the addToCart function from CartContext using the useContext hook
  const { addToCart } = useContext(CartContext);

  /**
   * handleClick:
   * This function is called when the "Add to Cart" button is clicked.
   * It logs the product being added for debugging purposes and calls the `addToCart` function from the context.
   *
   * @param {Object} product - The product object to be added to the cart
   */
  const handleClick = (product) => {
    console.log("Adding to cart", product); // Log the product being added to the cart (for debugging purposes)
    addToCart(product); // Call the addToCart function to add the product to the cart
  };

  return (
    // Render the "Add to Cart" button, which triggers handleClick when clicked
    <a
      className="f6 link dim br3 ba bw1 ph3 pv2 mb2 dib black" // Tailwind CSS classes for styling the button
      onClick={() => handleClick(product)} // Call handleClick with the product when the button is clicked
    >
      Add to Cart
    </a>
  );
}
