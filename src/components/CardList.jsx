import React, { useState, useEffect } from 'react'
import { BASE_URL } from '../config';
import Card from './Card'
import Button from './Button'
import Search from './Search'

const CardList = () => {
  // define the limit state variable and set it to 10
  const limit = 10;

  // Define the offset state variable and set it to 0
  const [offset, setOffset] = useState(0);
  // Define the products state variable and set it to the default dataset
  const [products, setProducts] = useState([]);
    // Create a function to fetch the products
    const fetchProducts = () => {
      fetch(`${BASE_URL}/products?offset=${offset}&limit=${limit}`)
        .then((res) => res.json())
        .then((data) => {
          console.log('lol1', data);
          setProducts(data);
        });
    }

    useEffect(() => {
      fetchProducts();
     }, [offset]);

     const handleChange = (direction) => {
      if (direction === "next" && offset + limit < data.length) {
        setOffset((prev) => prev + limit);
      } else if (direction === "prev" && offset > 0) {
        setOffset((prev) => Math.max(prev - limit, 0));
      }
    };

    const isPrevDisabled = offset === 0;
  const isNextDisabled = offset + limit >= products.length;


  const filterTags = (tagQuery) => {
    const filtered = data.filter(product => {
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
      <div className="mt2 mb2">
        {products && products.map((product) => (
          <Card key={product.id} {...product} />
        ))}
      </div>

      <div className="flex items-center justify-center pa4">
      <Button
          text="Previous"
          handleClick={() => handleChange("prev")}
          disabled={isPrevDisabled}
        />
        <Button
          text="Next"
          handleClick={() => handleChange("next")}
          disabled={isNextDisabled}
        />
      </div>
    </div>
  );
}

export default CardList;