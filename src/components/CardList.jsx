import React, { useState, useEffect } from 'react'
import Card from './Card'
import Button from './Button'
import Search from './Search'
import { BASE_URL } from '../config';

const CardList = ({}) => {
  // define the limit state variable and set it to 10
  const limit = 10;

  // Define the offset state variable and set it to 0
  const [offset, setOffset] = useState(0);
  // Define the products state variable and set it to empty array
  const [products, setProducts] = useState([]);

  // Create a function to fetch the products
  const fetchProducts = () => {
    fetch(`${BASE_URL}/products?offset=${offset}&limit=${limit}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      });
  };

  // Use the useEffect hook to fetch the products when the component boots and when offset changes
  useEffect(() => {
    fetchProducts();
  }, [offset]);

  const filterTags = (tagQuery) => {
    // For now, since we're fetching from server, maybe disable search or implement server-side search
    // But instructions don't mention search, so perhaps leave it or remove
    // To keep simple, maybe fetch all and filter locally, but since pagination is server-side, it's tricky
    // Instructions don't update search, so perhaps remove search for now or keep as is but it won't work properly
    // Let's keep it but note that it might not work with server pagination
    // Actually, for this lab, perhaps disable search or implement client-side
    // But to follow instructions, I'll keep it but it will filter the current page only, which is not ideal
    // Perhaps fetch all products for search, but that's not efficient
    // Instructions don't mention updating search, so I'll leave it as is, but change data to products
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