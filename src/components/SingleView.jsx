import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { BASE_URL } from '../config';
import { useCart } from '../state/CartProvider';

const SingleView = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    fetch(`${BASE_URL}/products/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data));
  }, [id]);

  if (!product) return <div className="loading-spinner"></div>;

  return (
    <div className="bg-white center mw7 ba b--black-10 mv4">
      <div className="pv2 ph3">
        <div className="flex items-center">
          <img src={product.image} className="br-100 h3 w3 dib" alt={product.name} />
          <h1 className="ml3 f4">{product.name}</h1>
        </div>
      </div>
      <div className="aspect-ratio aspect-ratio--4x3">
        <div className="aspect-ratio--object cover" style={{ backgroundImage: `url(${product.image})` }}></div>
      </div>
      <div className="pa3 flex justify-between">
        <div className="mw6">
          <h1 className="f6 ttu tracked">Product ID: {product._id}</h1>
        </div>
        <div className="gray db pv2">&hearts;<span>{product.likes}</span></div>
      </div>
      <div className="pa3 flex justify-end">
        <span className="ma2 f4">${product.price}</span>
        <button onClick={() => addToCart(product)} className="f6 link dim br3 ba bw1 ph3 pv2 mb2 dib black">Add to Cart</button>
      </div>
    </div>
  );
}

export default SingleView;
