import React from 'react';
import { Link } from 'react-router-dom';

export default function Card(props) {
  const {
    _id,
    id,
    urls,
    user,
    likes,
    price,
    description,
    alt_description,
  } = props;


  const cardId = _id || id;

  const title = description ?? alt_description;
  const style = {
    backgroundImage: `url(${urls.small || urls.thumb || urls.regular})`,
  };

  return (
    <article className="fl w-100 w-50-m w-25-l pa2">
      <div className="bg-white br2 pa2 shadow-1">
        <Link to={`/product/${cardId}`} className="link black">
          <div className="aspect-ratio aspect-ratio--4x3 mb2">
            <div className="aspect-ratio--object cover" style={style}></div>
          </div>
        </Link>

        <h1 className="f6 mv2 truncate">{title}</h1>
        <p className="f7 mv1 gray">
          {user?.first_name} {user?.last_name}
        </p>
        <p className="f7 mv1 gray">{likes} Likes</p>
        {price != null && (
          <p className="f6 mv1 b">${price}</p>
        )}
      </div>
    </article>
  );
}