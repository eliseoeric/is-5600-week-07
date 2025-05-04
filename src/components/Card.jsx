import React from "react";
import { Link } from "react-router-dom";

const Card = ({ description, alt_description, id, _id, user = {}, urls = {}, likes = 0 }) => {
  const uuid = id ?? _id;
  const imageUrl = urls.small || "https://via.placeholder.com/300"; // fallback image
  const style = {
    backgroundImage: `url(${imageUrl})`
  };

  return (
    <div className="fl w-50 w-25-m w-20-l pa2">
      <Link to={`/product/${uuid}`} className="db link dim tc">
        <div
          style={style}
          className="w-100 db outline black-10 h4 cover"
          aria-label="Product Image"
        ></div>
        <dl className="mt2 f6 lh-copy">
          <dt className="clip">Title</dt>
          <dd className="ml0 black truncate w-100">{description ?? alt_description ?? "Untitled"}</dd>
          <dt className="clip">Artist</dt>
          <dd className="ml0 gray truncate w-100">
            {user.first_name ?? "Unknown"} {user.last_name ?? ""}
          </dd>
          <dt className="clip">Likes</dt>
          <dd className="ml0 gray truncate w-100">{likes} Likes</dd>
        </dl>
      </Link>
    </div>
  );
};

export default Card;
