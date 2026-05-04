import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../App.css';
import { BASE_URL } from '../config';
import AddToCart from './AddToCart'; 


export default function SingleView({data}) {
  // get the id from the url using useParams
  const { id } = useParams();

  // get the product from the data using the id
  const product = data.find(product => product.id === id);
  const [product, setProduct] = useState(null);
  const fetchProductById = async (id) => {
    const product = await fetch(`${BASE_URL}/products/${id}`)
      .then((res) => res.json());
    return product;
  };
  useEffect(() => {
    const getProduct = async () => {
      const data = await fetchProductById(id);
      setProduct(data);
    };
    getProduct();
  }, [id]); 
  if (!product) return (<div className="loading-spinner"></div>);

  const { user } = product;