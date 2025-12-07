import React, { useState, useEffect } from "react";
import Card from "./Card";
import Button from "./Button";
import Search from "./Search";
import { BASE_URL } from '../config';

const CardList = ({}) => {

    // Define the limit state variable and set it to 10
    const limit = 10;
    // Define the offset state variable and set it to 0
    const [offset, setOffset] = useState(0);
    // Define the products state variable and set it to the default dataset
    const [products, setProducts] = useState([]);

    // Create a function to fetch the products, including limit and offset parameters
    const fetchProducts = () => {
        // Updated URL for server-side pagination
        fetch(`${BASE_URL}/products?offset=${offset}&limit=${limit}`)
            .then((res) => res.json())
            .then((data) => {
                setProducts(data);
            })
            .catch(error => console.error("Error fetching products:", error));
    };
    
    // Use the useEffect hook to fetch the products when the component boots or offset changes
    useEffect(() => {
        fetchProducts();
    }, [offset]); // Dependency array: re-runs fetchProducts whenever offset changes

    // Handlers to update offset (assuming filtering is removed or handled elsewhere)
    const handlePrevious = () => {
        setOffset(prevOffset => Math.max(0, prevOffset - limit));
    };

    const handleNext = () => {
        setOffset(prevOffset => prevOffset + limit);
    };

    // Placeholder for filterTags if needed, using local data temporarily
    const filterTags = (tagQuery) => {
        console.log("Filtering disabled for server-side pagination demo.");
        // If you were to implement server-side filtering, you would update the fetchProducts call here
    };

    return (
        <div className="cf pa2">
            <Search handleSearch={filterTags}/>
            <div className="mt2 mb2">
                {products && products.map((product) => (
                    // Assumes the product object has an 'id' or '_id'
                    <Card key={product._id || product.id} {...product} /> 
                ))}
            </div>

            <div className="flex items-center justify-center pa4">
                <Button text="Previous" handleClick={handlePrevious} />
                <Button text="Next" handleClick={handleNext} />
            </div>
        </div>
    );
}

export default CardList;