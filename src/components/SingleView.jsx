import React, { useState, useEffect } from 'react'; // Import React hooks for state and side effects
import { useParams } from 'react-router-dom'; // Import the useParams hook to get URL parameters
import { BASE_URL } from '../config'; // Import the base URL for API calls
import AddToCart from './AddToCart'; // Import the AddToCart component for adding products to the cart
import '../App.css'; // Import custom styles

/**
 * SingleView Component:
 * This component fetches and displays detailed information about a single product
 * based on the ID from the URL. It also provides the option to add the product to the cart.
 */
export default function SingleView() {
  // Get the 'id' from the URL using the useParams hook
  const { id } = useParams();

  // Initialize the product state to store the fetched product details
  const [product, setProduct] = useState(null);

  /**
   * fetchProductById:
   * Fetches a single product's details from the API using the product ID.
   * Updates the 'product' state with the fetched product data.
   */
  const fetchProductById = (id) => {
    fetch(`${BASE_URL}/products/${id}`) // Fetch the product using its ID
      .then((res) => res.json()) // Parse the response as JSON
      .then((data) => {
        setProduct(data); // Update the 'product' state with the fetched product data
      });
  };

  /**
   * useEffect:
   * Fetches the product details whenever the 'id' (URL parameter) changes.
   */
  useEffect(() => {
    fetchProductById(id); // Call the fetch function when the component is mounted or the 'id' changes
  }, [id]); // Dependency array ensures this runs whenever the 'id' changes

  // If the product is not yet fetched, display a loading spinner
  if (!product) return (<div className="loading-spinner"></div>);

  // Destructure user data from the fetched product object
  const { user } = product;

  // Determine the product title (fallback to alternative description if necessary)
  const title = product.description ?? product.alt_description;

  // Define the style object for the product image's background
  const style = {
    backgroundImage: `url(${product.urls["regular"]})`
  };

  return (
    <article className="bg-white center mw7 ba b--black-10 mv4">
      {/* Product Header with User Info */}
      <div className="pv2 ph3">
        <div className="flex items-center">
          {/* Display the user's profile image and name */}
          <img src={user?.profile_image?.medium} className="br-100 h3 w3 dib" alt={user.instagram_username} />
          <h1 className="ml3 f4">{user.first_name} {user.last_name}</h1>
        </div>
      </div>

      {/* Product Image */}
      <div className="aspect-ratio aspect-ratio--4x3">
        {/* Display the product image using the style object */}
        <div className="aspect-ratio--object cover" style={style}></div>
      </div>

      {/* Product Details */}
      <div className="pa3 flex justify-between">
        <div className="mw6">
          {/* Display the product ID and a clickable title that links to the product page */}
          <h1 className="f6 ttu tracked">Product ID: {id}</h1>
          <a href={`/products/${id}`} className="link dim lh-title">{title}</a>
        </div>
        {/* Display the number of likes the product has received */}
        <div className="gray db pv2">&hearts;<span>{product.likes}</span></div>
      </div>

      {/* Product Price and Add to Cart Button */}
      <div className="pa3 flex justify-end">
        {/* Display the product price */}
        <span className="ma2 f4">${product.price}</span>
        {/* Render the AddToCart component, passing the product as a prop */}
        <AddToCart product={product} />
      </div>
    </article>
  );
}