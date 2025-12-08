import React, {useState,useEffect}from 'react'
import { useParams } from 'react-router-dom';
import '../App.css';
import AddToCart from './AddToCart';


export default function SingleView() {
  // get the id from the url using useParams
  const { id } = useParams();
  const BASE_URL=`https://shiny-space-fishstick-v6wpj7r6g6q4cxw6p-3080.app.github.dev`;


  // Define the state object for product data
  const [ product, setProduct ] = useState(null)

  // Fetch the product by id from the server
  const fetchProductById = async (id) => {
    const product = await fetch(`${BASE_URL}/products/${id}`)
      .then((res) => res.json());
    return product;
  };

  // Use the useEffect hook to fetch the product when the component boots
  useEffect(() => {
    const getProduct = async () => {
      const data = await fetchProductById(id);
      setProduct(data)
    }
    getProduct();
  }, [id, fetchProductById]);

  // show a spinner if there is no product loaded yet
  if (!product) return (<div className="loading-spinner"></div>);

  // ...

  console.log("product: ",product);
  

  return (
    <article class="bg-white center mw7 ba b--black-10 mv4">
      <div class="pv2 ph3">
        <div class="flex items-center">
          <img src={product.user?.profile_url?.medium} class="br-100 h3 w3 dib" alt={product.user.username} />
          <h1 class="ml3 f4">{product.user.first_name} {product.user.last_name}</h1>
        </div>
      </div>
      <div class="aspect-ratio aspect-ratio--4x3">
        {/* <div class="aspect-ratio--object cover" style={style}></div> */}
      </div>
      <div class="pa3 flex justify-between">
        <div class="mw6">
          <h1 class="f6 ttu tracked">Product ID: {product.user.id}</h1>
          <a href={`/products/${id}`} class="link dim lh-title">{product.alt_description}</a>
        </div>
        <div class="gray db pv2">&hearts;<span>{product.likes}</span></div>
      </div>
      <div className="pa3 flex justify-end">
        <span className="ma2 f4">${product.price}</span>
      <AddToCart product={product}/>
      </div>
    </article>

  )
}

