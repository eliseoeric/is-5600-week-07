import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import '../App.css';
import { BASE_URL } from '../config';
import { useCart } from '../state/CartProvider';

export default function SingleView() {
  // Get the id from the url
  const { id } = useParams();

  // State for the product
  const [product, setProduct] = useState(null);

  // Get addToCart from CartContext
  const { addToCart } = useCart();

  // Fetch the product by id from the server
  const fetchProductById = async (id) => {
    const product = await fetch(`${BASE_URL}/products/${id}`)
      .then((res) => res.json());
    return product;
  };

  // Run when the id changes
  useEffect(() => {
    const getProduct = async () => {
      const data = await fetchProductById(id);
      setProduct(data);
    }
    getProduct();
  }, [id]);

  // Show a spinner while the product is loading
  if (!product) return (<div className="loading-spinner"></div>);

  const { user } = product;
  const title = product.description ?? product.alt_description;
  const style = {
    backgroundImage: `url(${product.urls?.regular})`
  }

  return (
    <article className="bg-white center mw7 ba b--black-10 mv4">
      <div className="pv2 ph3">
        <div className="flex items-center">
          <img src={user?.profile_image?.medium} className="br-100 h3 w3 dib" alt={user?.instagram_username} />
          <h1 className="ml3 f4">{user?.first_name} {user?.last_name}</h1>
        </div>
      </div>
      <div className="aspect-ratio aspect-ratio--4x3">
        <div className="aspect-ratio--object cover" style={style}></div>
      </div>
      <div className="pa3 flex justify-between">
        <div className="mw6">
          <h1 className="f6 ttu tracked">Product ID: {id}</h1>
          <a href={`/products/${id}`} className="link dim lh-title">{title}</a>
        </div>
        <div className="gray db pv2">&hearts;<span>{product.likes}</span></div>
      </div>
      <div className="pa3 flex justify-end">
        <span className="ma2 f4">${product.price}</span>
        {/* AddToCart button */}
        <a
          className="f6 link dim br3 ba bw1 ph3 pv2 mb2 dib black pointer"
          onClick={() => addToCart(product)}
        >
          Add to Cart
        </a>
      </div>
    </article>
  )
}