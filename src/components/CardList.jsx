import React, { useState, useEffect } from "react"; // Import necessary React functions and hooks
import { BASE_URL } from '../config'; // Import the base URL for API calls from a configuration file
import Card from './Card'; // Import the Card component to display individual product data
import Button from './Button'; // Import the Button component for pagination controls
import Search from './Search'; // Import the Search component for filtering products by tags (currently commented out)

/**
 * CardList Component:
 * This component fetches and displays a list of products, with pagination functionality,
 * and allows for optional filtering of products based on tags.
 */
const CardList = () => {
  // Set the number of products to fetch in each request
  const limit = 10;

  // Initialize state variable to store the current offset for pagination (starting at 0)
  const [offset, setOffset] = useState(0);

  // Initialize state variable to store the products fetched from the API
  const [products, setProducts] = useState([]);

  /**
   * fetchProducts:
   * Fetches a list of products from the API, using the current offset and limit.
   * Updates the 'products' state with the fetched data.
   */
  const fetchProducts = () => {
    // Fetch products from the API with the specified offset and limit
    fetch(`${BASE_URL}/products?offset=${offset}&limit=${limit}`)
      .then((res) => res.json()) // Parse the response as JSON
      .then((data) => {
        setProducts(data); // Update the 'products' state with the fetched data
      });
  };

  /**
   * useEffect:
   * Runs when the 'offset' state changes (pagination).
   * Calls 'fetchProducts' to load products for the current page.
   */
  useEffect(() => {
    fetchProducts(); // Fetch products whenever the offset changes
  }, [offset]);

  /**
   * handlePrevious:
   * Decreases the offset to show the previous set of products (if possible).
   * Updates the offset by subtracting the limit, which fetches the previous 10 products.
   */
  const handlePrevious = () => {
    setOffset(offset - limit); // Move to the previous page by adjusting the offset
  };

  /**
   * handleNext:
   * Increases the offset to show the next set of products.
   * Updates the offset by adding the limit, which fetches the next 10 products.
   */
  const handleNext = () => {
    setOffset(offset + limit); // Move to the next page by adjusting the offset
  };

  /**
   * filterTags:
   * Filters the list of products based on the selected tag (currently implemented as a local filter).
   * Resets the pagination offset to 0 and updates the 'products' state with the filtered data.
   *
   * Note: This is currently a local filter on the 'data' variable (which is undefined here),
   * but it should ideally trigger a new API call to fetch products by tag.
   */
  const filterTags = (tag) => {
    const filtered = data.filter(product => {
      if (!tag) {
        return product; // Return all products if no tag is specified
      }

      // Find products that have the matching tag
      return product.tags.find(({ title }) => title === tag);
    });

    setOffset(0); // Reset the offset to 0 when filtering
    setProducts(filtered); // Update the products state with the filtered list
  };

  return (
    <div className="cf pa2">
      {/* The Search component allows users to filter products by tag. Uncomment to enable it. */}
      {/* <Search handleSearch={filterTags} /> */}

      {/* Display the list of products using the Card component for each product */}
      <div className="mt2 mb2">
        {products && products.map((product) => (
          <Card key={product._id} {...product} /> // Render a Card component for each product
        ))}
      </div>

      {/* Pagination buttons for navigating between sets of products */}
      <div className="flex items-center justify-center pa4">
        <Button text="Previous" handleClick={handlePrevious} /> {/* Previous button */}
        <Button text="Next" handleClick={handleNext} /> {/* Next button */}
      </div>
    </div>
  );
};

export default CardList;