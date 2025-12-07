// src/components/SingleView.jsx

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { BASE_URL } from '../config';
// Assuming AddToCart is defined as a component to be used later
import AddToCart from './AddToCart'; 

export default function SingleView() {
    // get the id from the url using useParams
    const { id } = useParams();

    const [product, setProduct] = useState(null);

    // Fetch the product by id from the server
    const fetchProductById = async (productId) => {
        try {
            const response = await fetch(`${BASE_URL}/products/${productId}`);
            const productData = await response.json();
            return productData;
        } catch (error) {
            console.error("Error fetching single product:", error);
            return null;
        }
    };

    // Use the useEffect hook to fetch the product when the component boots or 'id' changes
    useEffect(() => {
        const getProduct = async () => {
            const data = await fetchProductById(id);
            setProduct(data);
        };
        getProduct();
    }, [id]); // Dependency array: only re-runs if 'id' changes

    // show a spinner if there is no product loaded yet
    if (!product) return (<div className="loading-spinner">Loading...</div>);

    // --- Structural Fix: Code below is safely inside the function ---

    const { user } = product;
    // Use optional chaining (?) for safe nested access
    const title = product.description ?? product.alt_description; 
    const style = {
        backgroundImage: `url(${product.urls?.["regular"]})`
    };

    return (
        <article className="bg-white center mw7 ba b--black-10 mv4">
            {/* ... (Header section using user data) ... */}
            <div className="pv2 ph3">
                <div className="flex items-center">
                    <img src={user?.profile_image?.medium} className="br-100 h3 w3 dib" alt={user?.instagram_username} />
                    <h1 className="ml3 f4">{user?.first_name} {user?.last_name}</h1>
                </div>
            </div>
            {/* ... (Image section) ... */}
            <div className="aspect-ratio aspect-ratio--4x3">
                <div className="aspect-ratio--object cover" style={style}></div>
            </div>
            {/* ... (Details section) ... */}
            <div className="pa3 flex justify-between">
                <div className="mw6">
                    <h1 className="f6 ttu tracked">Product ID: {id}</h1>
                    <a href={`/products/${id}`} className="link dim lh-title">{title}</a>
                </div>
                <div className="gray db pv2">&hearts;<span>{product.likes}</span></div>
            </div>
            {/* ... (Price and AddToCart section) ... */}
            <div className="pa3 flex justify-end">
                <span className="ma2 f4">${product.price}</span>
                {/* Replaced TODO with the AddToCart component */}
                <AddToCart product={product} /> 
            </div>
        </article>
    );
}