import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../config';
import { useCart } from '../state/CartProvider';
import '../App.css';

export default function SingleView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, cartItems } = useCart();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAdded, setIsAdded] = useState(false);

  // Check if product is already in cart
  const isInCart = () => {
    return cartItems.some(item => item._id === id);
  };

  // Fetch the product by id from the server
  const fetchProductById = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/products/${id}`);
      if (!response.ok) {
        throw new Error('Product not found');
      }
      const data = await response.json();
      
      // Add price field if it doesn't exist (use likes as price)
      if (!data.price && data.likes) {
        data.price = data.likes;
      }
      
      return data;
    } catch (error) {
      console.error('Error fetching product:', error);
      return null;
    }
  };

  // Use the useEffect hook to fetch the product when the component boots
  useEffect(() => {
    const getProduct = async () => {
      setLoading(true);
      const data = await fetchProductById(id);
      setProduct(data);
      setLoading(false);
    };
    getProduct();
  }, [id]);

  // Update isAdded state when cartItems change
  useEffect(() => {
    setIsAdded(isInCart());
  }, [cartItems, id]);

  // Handle add to cart
  const handleAddToCart = () => {
    if (product) {
      const productWithPrice = {
        ...product,
        price: product.price || product.likes || 0
      };
      addToCart(productWithPrice);
      setIsAdded(true);
    }
  };

  // Handle go to cart
  const handleGoToCart = () => {
    navigate('/cart');
  };

  // Handle back button
  const handleBack = () => {
    navigate(-1); // Go back to previous page
  };

  // Show a spinner if there is no product loaded yet
  if (loading || !product) {
    return (
      <div className="flex items-center justify-center pa5">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  const { user } = product;
  const title = product.description ?? product.alt_description;
  const price = product.price || product.likes || 0;
  
  const style = {
    backgroundImage: `url(${product.urls["regular"]})`
  };

  return (
    <article className="bg-white center mw7 ba b--black-10 mv4">
      {/* Back Button */}
      <div className="pa3 bb b--black-10">
        <button
          onClick={handleBack}
          className="f6 link dim br2 ph3 pv2 dib black ba b--black bg-white pointer flex items-center"
        >
          <span className="mr2">←</span>
          Back
        </button>
      </div>

      <div className="pv2 ph3">
        <div className="flex items-center">
          <img 
            src={user?.profile_image?.medium} 
            className="br-100 h3 w3 dib" 
            alt={user?.instagram_username || 'User'} 
          />
          <h1 className="ml3 f4">{user?.first_name} {user?.last_name}</h1>
        </div>
      </div>
      
      <div className="aspect-ratio aspect-ratio--4x3">
        <div className="aspect-ratio--object cover" style={style}></div>
      </div>
      
      <div className="pa3 flex justify-between">
        <div className="mw6">
          <h1 className="f6 ttu tracked">Product ID: {id}</h1>
          <a href={`/product/${id}`} className="link dim lh-title">{title}</a>
        </div>
        <div className="gray db pv2">&hearts;<span>{product.likes}</span></div>
      </div>
      
      <div className="pa3 flex justify-end items-center bt b--black-10">
        <span className="ma2 f3 b green">${price}</span>
        
        {isAdded ? (
          <button
            onClick={handleGoToCart}
            className="f6 link dim br3 ba bw1 ph3 pv2 mb2 dib white bg-blue bn pointer"
          >
            🛒 Go to Cart
          </button>
        ) : (
          <button
            onClick={handleAddToCart}
            className="f6 link dim br3 ba bw1 ph3 pv2 mb2 dib black pointer"
          >
            Add to Cart
          </button>
        )}
      </div>
    </article>
  );
}