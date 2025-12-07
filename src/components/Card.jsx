import React from "react";
import { Link } from "react-router-dom";

function Card({ _id, urls, image, description, name, user, likes }) {
  const imageUrl = urls?.small || image || urls?.thumb || "";
  const title = description || name || "Untitled";
  const author =
    user?.name ||
    [user?.first_name, user?.last_name].filter(Boolean).join(" ") ||
    "Unknown";
  const likeCount = likes ?? 0;

  return (
    <article className="fl w-100 w-25-ns pa2">
      <Link to={`/product/${_id}`} className="link black">
        {imageUrl && (
          <img src={imageUrl} alt={title} className="db w-100" />
        )}
        <h2 className="f6 mt2 mb1">{title}</h2>
        <p className="f7 mt0 mb1 gray">{author}</p>
        <p className="f7 mt0 gray">{likeCount} Likes</p>
      </Link>
    </article>
  );
}

export default Card;
