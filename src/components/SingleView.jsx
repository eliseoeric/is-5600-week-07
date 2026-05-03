import React from 'react';
import { useParams } from 'react-router-dom';
import { useStore } from '../state/StoreContext';
import '../App.css';

export default function SingleView() {
  const { id } = useParams();
  const { products, addToCart } = useStore();
  const product = products.find((productItem) => productItem._id === id);

  if (!product) {
    return (
      <div className="center mw7 mv4 pa3 bg-white ba b--black-10">
        <p>Product not found.</p>
      </div>
    );
  }

  const title = product.description || product.alt_description || 'Untitled product';
  const style = {
    backgroundImage: `url(${product.urls?.regular || product.urls?.small || ''})`,
  };

  return (
    <article className="bg-white center mw7 ba b--black-10 mv4">
      <div className="pv2 ph3">
        <div className="flex items-center">
          <img
            src={product.user?.profile_image?.medium || 'https://via.placeholder.com/80'}
            className="br-100 h3 w3 dib"
            alt={product.user?.username || 'Product author'}
          />
          <h1 className="ml3 f4">{product.user?.first_name} {product.user?.last_name}</h1>
        </div>
      </div>
      <div className="aspect-ratio aspect-ratio--4x3">
        <div className="aspect-ratio--object cover" style={style}></div>
      </div>
      <div className="pa3 flex flex-column">
        <div className="mw6 mb3">
          <h1 className="f6 ttu tracked">Product ID: {id}</h1>
          <div className="lh-copy">
            <p className="f4 mb2">{title}</p>
            <p className="gray">{product.description || product.alt_description}</p>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="ma2 f4">${product.price?.toFixed(2) ?? '0.00'}</span>
          <button
            className="pa3 bg-black white br2 pointer"
            type="button"
            onClick={() => addToCart(product)}
          >
            Add to cart
          </button>
        </div>
      </div>
    </article>
  );
}
