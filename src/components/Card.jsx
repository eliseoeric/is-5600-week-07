import React from "react";
import { Link } from "react-router-dom";

const Card = ({ product, onAddToCart }) => {
  const { _id: id, description, alt_description, user, urls, likes } = product;

  const style = {
    backgroundImage: `url(${urls.small})`
  }
  
  return (
    <div className="fl w-50 w-25-m w-20-l pa2">
      <div className="db link dim tc">
        <Link to={`/product/${id}`} className="db link dim tc"> 
          <div style={style} alt="" className="w-100 db outline black-10 h4 cover"></div>
          <dl className="mt2 f6 lh-copy">
            <dt className="clip">Title</dt>
            <dd className="ml0 black truncate w-100">{description ?? alt_description}</dd>
            <dt className="clip">Artist</dt>
            <dd className="ml0 gray truncate w-100">{user.first_name} {user.last_name}</dd>
            <dt className="clip">Likes</dt>
            <dd className="ml0 gray truncate w-100">{likes} Likes</dd>
          </dl>
        </Link>
        <a
          href="#"
          className="f6 no-underline black bg-animate hover-bg-black hover-white inline-flex items-center pa2 ba border-box mt2"
          onClick={(event) => {
            event.preventDefault();
            onAddToCart(product);
          }}
        >
          Add to Cart
        </a>
      </div>
    </div>
  )
}

export default Card;