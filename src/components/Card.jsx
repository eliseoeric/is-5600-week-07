import React from "react";
import { Link } from "react-router-dom";

const Card = ({description, alt_description, id, _id, user, urls, likes}) => {
  // Use likes as price if price is not available
  const price = likes || 0;

  const style = {
    backgroundImage: `url(${urls.small})`
  }
  
  return (
    <div className="fl w-50 w-25-m w-20-l pa2">
      <Link to={`/product/${_id}`} className="db link dim tc"> 
        <div style={style} alt="" className="w-100 db outline black-10 h4 cover"></div>
        <dl className="mt2 f6 lh-copy">
          <dt className="clip">Title</dt>
          <dd className="ml0 black truncate w-100">{description ?? alt_description}</dd>
          <dt className="clip">Artist</dt>
          <dd className="ml0 gray truncate w-100">{user.first_name} {user.last_name}</dd>
          <dt className="clip">Price</dt>
          <dd className="ml0 green truncate w-100 b">${price}</dd>
        </dl>
      </Link>
    </div>
  )
}

export default Card;