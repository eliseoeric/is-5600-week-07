import React from "react";
import { Link } from "react-router-dom";

const Card = ({ id, _id, description, alt_description, urls, imgThumb, user, userName, likes }) => {
  // canonical id (supports both data shapes)
  const uuid = id || _id || "";

  // image fallback: prefer urls.small (unsplash), then imgThumb (products.json), then empty
  const imgUrl = (urls && (urls.small || urls.regular)) || imgThumb || "";

  const style = {
    backgroundImage: imgUrl ? `url(${imgUrl})` : undefined,
    backgroundColor: imgUrl ? undefined : "#f7f7f7"
  };

  return (
    <div className="fl w-50 w-25-m w-20-l pa2">
      <Link to={`/product/${uuid}`} className="db link dim tc">
        <div
          style={style}
          className="w-100 db outline black-10 h4 cover"
          role="img"
          aria-label={description ?? alt_description ?? "product image"}
        />
        <dl className="mt2 f6 lh-copy">
          <dt className="clip">Title</dt>
          <dd className="ml0 black truncate w-100">{description ?? alt_description ?? "No title"}</dd>
          <dt className="clip">Artist</dt>
          <dd className="ml0 gray truncate w-100">{userName ?? user?.name ?? `${user?.first_name ?? "Unknown"} ${user?.last_name ?? "Artist"}`}</dd>
          <dt className="clip">Likes</dt>
          <dd className="ml0 gray truncate w-100">{likes ?? 0} Likes</dd>
        </dl>
      </Link>
    </div>
  );
};

export default Card;
