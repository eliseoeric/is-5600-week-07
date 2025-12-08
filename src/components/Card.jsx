import { Link } from "react-router-dom";

export default function Card(product) {
  const { _id, urls, alt_description, tags = [], user = {} } = product;
  const title = tags.slice(0, 3).map((t) => t.title).join(", ") || "Untitled";
  const author = [user.first_name, user.last_name].filter(Boolean).join(" ") || user.username || "—";

  return (
    <article className="card">
      <Link to={`/product/${_id}`} className="db">
        <img className="thumb" src={urls?.small || urls?.thumb} alt={alt_description || title} />
        <div className="pa2">
          <div className="black-80 f6 fw6">{title}</div>
          <div className="gray f7 mt1">{author}</div>
        </div>
      </Link>
    </article>
  );
}
