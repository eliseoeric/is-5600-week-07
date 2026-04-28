import React from 'react';
import { useParams } from 'react-router-dom';
import '../App.css';

export default function SingleView({ data }) {
  const { id } = useParams();

  const product = data.find((product) => product.id === id || product._id === id);

  if (!product) {
    return <div className="tc pa4">Product not found</div>;
  }

  const title = product.description ?? product.alt_description;

  const style = {
    backgroundImage: `url(${product.urls.regular})`,
  };

  return (
    <article className="bg-white center mw7 ba b--black-10 mv4">
      <div style={style} className="vh-75 cover bg-center"></div>

      <div className="pa3">
        <p className="b">PRODUCT ID: {product.id || product._id}</p>
        <p className="blue">{title}</p>
        <p className="tr">♥{product.likes}</p>
      </div>
    </article>
  );
}