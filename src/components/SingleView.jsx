
import React from "react";
import { useParams, Link } from "react-router-dom";
import PropTypes from "prop-types";
import fullProducts from "../data/full-products.json";
import AddToCart from "./AddToCart";

export default function SingleView({ data = fullProducts }) {
  const { id } = useParams();

  
  const product = data.find((p) => String(p._id || p.id) === String(id));

  if (!product) {
    return <div className="pa4">Product not found.</div>;
  }

  const { user, urls, description, alt_description, likes, price, title, name } = product;
  const displayTitle = description ?? alt_description ?? title ?? name;
  const style = {
    backgroundImage: `url(${urls?.regular || product.image || ""})`,
  };

  return (
    <article className="bg-white center mw7 ba b--black-10 mv4">
      <div className="pv2 ph3">
        <div className="flex items-center">
          {user?.profile_image?.medium && (
            <img
              src={user.profile_image.medium}
              className="br-100 h3 w3 dib"
              alt={user?.instagram_username || ""}
            />
          )}
          <h1 className="ml3 f4">
            {user?.first_name} {user?.last_name}
          </h1>
        </div>
      </div>
      <div className="aspect-ratio aspect-ratio--4x3">
        <div className="aspect-ratio--object cover" style={style}></div>
      </div>
      <div className="pa3 flex justify-between">
        <div className="mw6">
          <h1 className="f6 ttu tracked">Product ID: {id}</h1>
          <span className="link dim lh-title">{displayTitle}</span>
        </div>
        <div className="gray db pv2">&hearts; {likes || 0}</div>
      </div>
      <div className="pa3">
        <p>Price: ${price || 0}</p>
        <AddToCart product={product} />
      </div>
      <Link to="/">
        <button className="ma3 pa2">Back to list</button>
      </Link>
    </article>
  );
}

SingleView.propTypes = {
  data: PropTypes.array,
};
