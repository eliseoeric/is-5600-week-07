import React from "react";
import { Link } from "react-router-dom";

const Card = ({ description, alt_description, id, _id, user, urls, likes }) => {
  // The `id` property exists in `full-products.json`, but not in our mongo DB. 
  // Fallback to `_id` if `id` is null.
  let uuid = id ?? _id;

  const style = {
    backgroundImage: `url(${urls.small})`
  };

  return (
    <div className="fl w-50 w-25-m w-20-l pa2">
      <Link to={`/product/${uuid}`} className="db link dim tc">
        <div style={style} alt="" className="w-100 db outline black-10 h4 cover"></div>
        <dl className="mt2 f6 lh-copy">
          <dt className="clip">Title</dt>
          <dd className="ml0 black truncate w-100">{description ?? alt_description}</dd>
        </dl>
      </Link>
    </div>
  );
};

export default Card;
