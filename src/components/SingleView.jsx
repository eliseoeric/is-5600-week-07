import React from 'react'
import { useParams } from 'react-router-dom';
import { useCart } from '../state/CartProvider';
import '../App.css';

export default function SingleView({data}) {
  const { id } = useParams();

  // Try both _id and id, and compare as strings to be safe
  const product = data.find(
    (p) => String(p._id) === String(id) || String(p.id) === String(id)
  );

  const { addToCart } = useCart();

  if (!product) return <p>Product not found</p>;

  const { user } = product;

  const title = product.description ?? product.alt_description;
  const style = {
    backgroundImage: `url(${product.urls["regular"]})`
  }

  return (
    <article className="bg-white center mw7 ba b--black-10 mv4">
      <div className="pv2 ph3">
        <div className="flex items-center">
          <img
            src={user?.profile_image?.medium}
            className="br-100 h3 w3 dib"
            alt={user.instagram_username}
          />
          <h1 className="ml3 f4">{user.first_name} {user.last_name}</h1>
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

        <button
          onClick={() => addToCart(product)}
          className="ma2 pa2 bg-black white br2 pointer dim"
        >
          Add to Cart
        </button>
      </div>
    </article>
  );
}