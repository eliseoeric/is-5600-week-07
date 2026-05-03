import React from "react";
import { Link } from "react-router-dom";

const Card = ({ description, urls, _id, user, likes }) => {
  const style = {
    backgroundImage: `url(${urls?.small})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  return (
    <div className="fl w-50 w-25-m w-20-l pa2">
      <Link to={`/product/${_id}`} className="db link dim tc">
        <div style={style} className="w-100 db outline black-10 h4 cover" />
        <dl className="mt2 f6 lh-copy">
          <dt className="clip">Title</dt>
          <dd className="ml0 black truncate w-100">{description}</dd>
          <dt className="clip">Artist</dt>
          <dd className="ml0 gray truncate w-100">{user?.first_name} {user?.last_name}</dd>
          {likes !== undefined && (
            <>
              <dt className="clip">Likes</dt>
              <dd className="ml0 gray truncate w-100">{likes} Likes</dd>
            </>
          )}
        </dl>
      </Link>
    </div>
  );
};

export default Card;