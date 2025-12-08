import React, { useState, useEffect } from 'react';import Card from './Card'
import Button from './Button'
import Search from './Search'
import { useCart } from '../state/CartProvider';
import { BASE_URL } from '../config';

  // Import the addToCart function from the CartContext
    const { addToCart } = useCart();

      const handleClick = (product) => {
            console.log("Adding to cart", product)
                addToCart(product)
                  }

const CardList = ({ }) => {
    // Define the products state variable
  const [products, setProducts] = useState([]);

  // Create a function to fetch the products
  const fetchProducts = () => {
    fetch(`${BASE_URL}/products`)
      .then(res => res.json())
      .then((data) => {
        setProducts(data);
      });
  };

  // Use the useEffect hook to fetch the products when the component boots
  useEffect(() => {
    fetchProducts();
  }, []);

 
  const filterTags = (tagQuery) => {
    const filtered = products.filter(product => {
      if (!tagQuery) {
        return product
      }

      return product.tags.find(({title}) => title === tagQuery)
    })

    setOffset(0)
    setProducts(filtered)
  }


  return (
    <div className="cf pa2">
      <Search handleSearch={filterTags}/>
      <div className="mt2 mb2">
      {products && products.map((product) => (
          <Card key={product._id} {...product} />
        ))}
      </div>

      <div className="flex items-center justify-center pa4">
        <Button text="Previous" handleClick={() => setOffset(offset - limit)} />
        <Button text="Next" handleClick={() => setOffset(offset + limit)} />
      </div>
    </div>
  )
}

export default CardList;