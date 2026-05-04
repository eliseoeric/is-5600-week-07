import React from "react";
import { Link } from "react-router-dom";

const Card = ({ description, alt_description, title, id, _id, user, urls, image, likes }) => {

  // handle both API + old data safely
  const productId = _id || id;
  const img = image || urls?.small || "https://via.placeholder.com/300";

  const style = {
    backgroundImage: `url(${img})`
  };

  const name = description || alt_description || title || "No title";

  return (
    <div className="fl w-50 w-25-m w-20-l pa2">
      <Link to={`/product/${productId}`} className="db link dim tc">

        <div
          style={style}
          className="w-100 db outline black-10 h4 cover"
        ></div>

        <dl className="mt2 f6 lh-copy">
          <dd className="ml0 black truncate w-100">{name}</dd>

          <dd className="ml0 gray truncate w-100">
            {user?.first_name ? `${user.first_name} ${user.last_name}` : "Unknown"}
          </dd>

          <dd className="ml0 gray truncate w-100">
            {likes || 0} Likes
          </dd>
        </dl>

      </Link>
    </div>
  );
};

export default Card;