@@ -1,14 +1,35 @@
import React from 'react'
import React, { useState, useEffect,useContext } from 'react'
import { useParams } from 'react-router-dom';
import '../App.css';
import { BASE_URL } from '../config';
import AddToCart from './AddToCart';


export default function SingleView({data}) {

export default function SingleView({}) {
  // get the id from the url using useParams
  const { id } = useParams();

  // get the product from the data using the id
  const product = data.find(product => product.id === id);
  // Define the state object for product data
  const [ product, setProduct ] = useState(null)

  // Fetch the product by id from the server
  const fetchProductById = async (id) => {
    const product = await fetch(`${BASE_URL}/products/${id}`)
      .then((res) => res.json());
    return product;
  };

  useEffect(() => {
    const getProduct = async () => {
      const data = await fetchProductById(id);
      setProduct(data)
    }
    getProduct();
  }, [id, fetchProductById]);

   // show a spinner if there is no product loaded yet
   if (!product) return (<div className="loading-spinner"></div>);


  const { user } = product;

@@ -37,7 +58,7 @@ export default function SingleView({data}) {
      </div>
      <div className="pa3 flex justify-end">
        <span className="ma2 f4">${product.price}</span>
        {/* TODO Implement the AddToCart button */}
        <AddToCart product = {product} />
      </div>
    </article>

  )
}