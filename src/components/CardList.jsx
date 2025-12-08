import React, { useState, useEffect } from "react";
import Card from "./Card";
import Button from "./Button";
import Search from "./Search";

const CardList = ({ data }) => {
  // ========== STATE DECLARATIONS ==========
  // Define the limit state variable and set it to 10
  const limit = 10;
  
  // Define the default dataset, using slice to get the first 10 products
  const defaultDataset = data.slice(0, limit);

  // Define the offset state variable and set it to 0
  const [offset, setOffset] = useState(0);
  
  // Define the products state variable and set it to the default dataset
  const [products, setProducts] = useState(defaultDataset);
  
  // Keep track of the current filtered/working dataset
  const [currentData, setCurrentData] = useState(data);

  // ========== TASK 1: FILTER TAGS FUNCTION ==========
  const filterTags = (searchTerm) => {
    // If searchTerm is empty, reset to show all products
    if (searchTerm === '') {
      setCurrentData(data);
      setOffset(0);
      setProducts(data.slice(0, limit));
      return;
    }
    
    // Filter the data by tags
    const filteredProducts = data.filter((product) => {
      // Check if the product has tags and if any tag includes the search term
      if (product.tags && Array.isArray(product.tags)) {
        return product.tags.some(tag => 
          tag.title.toLowerCase().includes(searchTerm)
        );
      }
      return false;
    });
    
    // Update current data to filtered results
    setCurrentData(filteredProducts);
    
    // Reset offset to 0 (start from beginning)
    setOffset(0);
    
    // Update the products state with the filtered results (first page)
    setProducts(filteredProducts.slice(0, limit));
  };

  // ========== TASK 2A: OPTIMIZED SINGLE PAGINATION FUNCTION ==========
  const handlePagination = (direction) => {
    if (direction === 'next') {
      setOffset(offset + limit);
    } else if (direction === 'previous') {
      setOffset(offset - limit);
    }
  };

  // ========== USE EFFECT HOOK ==========
  // This hook will run every time the offset, limit, or currentData state variables change
  // It will update the products state variable to display the correct page
  useEffect(() => {
    setProducts(currentData.slice(offset, offset + limit));
  }, [offset, limit, currentData]);

  // ========== TASK 2B: BOUNDARY CHECKS FOR PAGINATION ==========
  const isAtStart = offset === 0;
  const isAtEnd = offset + limit >= currentData.length;

  // ========== RETURN JSX ==========
  return (
    <div className="cf pa2">
      
      {/* Search Component */}
      <Search handleSearch={filterTags} />
      
      {/* Products Display */}
      <div className="mt2 mb2">
        {products.length > 0 ? (
          products.map((product) => (
            <Card key={product.id} {...product} />
          ))
        ) : (
          <p className="tc pa4">No products found matching your search.</p>
        )}
      </div>

      {/* TASK 2B: Pagination Buttons with Disable Logic */}
      <div className="flex items-center justify-center pa4">
        <Button 
          text="Previous" 
          handleClick={() => !isAtStart && handlePagination('previous')} 
        />
        <Button 
          text="Next" 
          handleClick={() => !isAtEnd && handlePagination('next')} 
        />
      </div>
      
      {/* Optional: Pagination Info */}
      <div className="tc pb4 gray">
        Showing {offset + 1} - {Math.min(offset + limit, currentData.length)} of {currentData.length} products
      </div>
    </div>
  );
};

export default CardList;