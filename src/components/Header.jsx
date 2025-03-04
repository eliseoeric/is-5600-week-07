import React, { useContext } from 'react'; // Import React and useContext hook to consume the CartContext
import { Link } from "react-router-dom"; // Import Link from react-router-dom for navigation between routes
import { CartContext } from '../state/CartProvider'; // Import the CartContext to access the cart state

/**
 * Header Component:
 * This component renders the navigation bar, including links to different pages (Products, Orders, Cart).
 * It also displays the total number of items currently in the cart, using data from CartContext.
 */
const Header = () => {
  // Access the cartItems from the CartContext using useContext hook
  const { cartItems } = useContext(CartContext);

  // Calculate the total number of items in the cart by summing up the quantities of all items
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    // The nav element represents the navigation bar
    <nav className="dt w-100 border-box pa3 ph5-ns">
      {/* Site logo with a link to the home page */}
      <a className="dtc v-mid mid-gray link dim w-25" href="/" title="Home">
        <img src="https://img.logoipsum.com/280.svg" className="dib w2 h2 br-100" alt="Site Name" /> {/* Placeholder logo */}
      </a>

      {/* Navigation links on the right-hand side */}
      <div className="dtc v-mid w-75 tr">
        {/* Link to the Products page */}
        <Link className="link dim dark-gray f6 f5-ns dib mr3 mr4-ns" to="/" title="Products">Products</Link>

        {/* Link to the Orders page */}
        <Link className="link dim dark-gray f6 f5-ns dib mr3 mr4-ns" to="/orders" title="Orders">Orders</Link>

        {/* Link to the Cart page with a badge showing the total number of items in the cart */}
        <Link className="link dim dark-gray f6 f5-ns dib" to="/cart" title="Cart">
          Cart <span className="ba b--black-20 br-pill pa2">{totalItems}</span> {/* Badge with the total number of items */}
        </Link>
      </div>
    </nav>
  );
}

export default Header;