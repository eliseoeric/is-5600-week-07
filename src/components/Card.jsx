
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Card = ({ description, alt_description, id, _id, user, urls, likes }) => {
  const [hover, setHover] = useState(false);

  const style = {
    backgroundImage: `url(${urls?.small || ""})`,
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    borderRadius: "8px",
    transform: hover ? "scale(1.05)" : "scale(1)",
    boxShadow: hover
      ? "0 8px 20px rgba(0, 0, 0, 0.2)"
      : "0 2px 6px rgba(0, 0, 0, 0.1)",
  };

  return (
    <div className="fl w-50 w-25-m w-20-l pa2">
      <Link
        to={`/product/${_id || id}`}
        className="db link tc"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        
        <div
          style={style}
          className="w-100 db outline black-10 h4 cover"
          alt=""
        ></div>

        
        <dl className="mt2 f6 lh-copy">
          <dt className="clip">Title</dt>
          <dd className="ml0 black truncate w-100">{description ?? alt_description}</dd>
          <dt className="clip">Artist</dt>
          <dd className="ml0 gray truncate w-100">{user?.first_name} {user?.last_name}</dd>
          <dt className="clip">Likes</dt>
          <dd className="ml0 gray truncate w-100">{likes || 0} Likes</dd>
        </dl>
      </Link>
    </div>
  );
};

export default Card;
