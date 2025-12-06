import React from "react";
import { Link } from "react-router-dom";

function Card(props) {
  const {
    id,
    _id,
    urls,
    image,
    description,
    alt_description,
    user,
    likes,
    price,
  } = props;
  const cardId = _id || id;
  const imgSrc =
    image ||
    urls?.small ||
    urls?.thumb ||
    urls?.regular ||
    "https://via.placeholder.com/400x300?text=No+Image";

  const title = description || alt_description || "Untitled";

  const artist =
    user?.name ||
    [user?.first_name, user?.last_name].filter(Boolean).join(" ");

  const imageElement = (
    <img src={imgSrc} alt={title} className="card__image" />
  );

  return (
    <div className="card">
      {cardId ? (
        <Link to={`/product/${cardId}`}>{imageElement}</Link>
      ) : (
        imageElement
      )}

      <div className="card__body">
        <h3 className="card__title">{title}</h3>
        {artist && <p className="card__author">{artist}</p>}
        {typeof likes === "number" && (
          <p className="card__likes">{likes} Likes</p>
        )}
        {typeof price === "number" && (
          <p className="card__price">${price.toFixed(2)}</p>
        )}
      </div>
    </div>
  );
}

export default Card;
