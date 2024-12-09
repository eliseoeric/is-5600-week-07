import React, { useState, useEffect } from "react";
import { BASE_URL } from '../config';
import Card from './Card'
import Search from './Search'
import Button from './Button'


const CardList = () => {
  // define the limit state variable and set it to 10
  const limit = 10;

  // Define the offset state variable and set it to 0
  const [offset, setOffset] = useState(0);
  // Define the products state variable and set it to the default dataset
  const [products, setProducts] = useState([]);

  const fetchProducts = () => {
    fetch(`${BASE_URL}/products?offset=${offset}&limit=${limit}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      });
  }
  // Use the useEffect hook to fetch the products when the component boots
  useEffect(() => {
   fetchProducts();
  }, [offset]);
  // Define the handlePrevious function
  const handlePrevious = () => {
    // set the offset to the previous 10 products
    setOffset(offset - limit);
  }

  // Define the handleNext function
  const handleNext = () => {
    // set the offset to the next 10 products
    setOffset(offset + limit);
  }

  const filterTags = (tag) => {
    const filtered = data.filter(product => {
      if (!tag) {
        return product
      }

      return product.tags.find(({ title }) => title === tag)
    })

    setOffset(0)
    setProducts(filtered)
  }

  const getPaginatedProducts = () => {
    return products.slice(offset, offset + limit);
  }

  return (
    <div className="cf pa2">
      <div className="mt2 mb2">
        {products && products.map((product) => (
          <Card key={product.id} {...product} />
        ))}
      </div>

      <div className="flex items-center justify-center pa4">
        <Button text="Previous" handleClick={handlePrevious} />
        <Button text="Next" handleClick={handleNext} />
      </div>
    </div>
  );

}

export default CardList;