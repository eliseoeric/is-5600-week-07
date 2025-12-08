import React from "react";
import { Link } from "react-router-dom";

const Card = ({description, alt_description, id, _id, user, urls, likes}) => {

  const style = {
    backgroundImage: `url(${urls.small})`
  }
  
  return (
    <div className="fl w-50 w-25-m w-20-l pa2">
      <Link to={`/product/${_id}`} className="db link dim tc"> 
        <div style={style} alt="" class="w-100 db outline black-10 h4 cover"></div>
        const fetchProducts = () => {
    fetch(`${BASE_URL}/products?offset=${offset}&limit=${limit}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      })
  }

  useEffect(() => {
    fetchProducts();
  }, [offset]);
