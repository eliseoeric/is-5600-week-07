import Card from './Card'
import Button from './Button'
import Search from './Search'

const CardList = ({ data }) => {
  // define the limit state variable and set it to 10
  const limit = 10;

  // Define the offset state variable and set it to 0
import React, { useState, useEffect } from 'react';
import Card from './Card';
import Button from './Button';
import Search from './Search';
import { BASE_URL } from '../config';

const CardList = () => {
  // Define state variables
  const [products, setProducts] = useState([]);
  const [offset, setOffset] = useState(0);
  // Define the products state variable and set it to the default dataset
  const [products, setProducts] = useState(data);
  const limit = 10; // Set limit for pagination

  // Fetch products from API
  const fetchProducts = () => {
    fetch(`${BASE_URL}/products?offset=${offset}&limit=${limit}`)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error fetching products:', error));
  };

  // Fetch products when component mounts and when offset changes
  useEffect(() => {
    setProducts(data.slice(offset, offset + limit));
  }, [offset, limit, data])
    fetchProducts();
  }, [offset]);

  // Function to filter products based on tags
  const filterTags = (tagQuery) => {
    const filtered = data.filter(product => {
      if (!tagQuery) {
        return product
      }

      return product.tags.find(({title}) => title === tagQuery)
    })

    setOffset(0)
@@ -29,22 +51,41 @@ const CardList = ({ data }) => {
    setProducts(filtered)
  }

    if (!tagQuery) {
      fetchProducts(); // Reset to all products if no filter is applied
      return;
    }

    const filtered = products.filter(
      (product) => product.tags?.some(({ title }) => title === tagQuery)
    );

    setOffset(0); // Reset pagination when filtering
    setProducts(filtered);
  };

  return (
    <div className="cf pa2">
      <Search handleSearch={filterTags}/>
      <Search handleSearch={filterTags} />

      <div className="mt2 mb2">
      {products && products.map((product) => (
        {products && products.map((product) => (
          <Card key={product._id} {...product} />
        ))}
      </div>

      <div className="flex items-center justify-center pa4">
        <Button text="Previous" handleClick={() => setOffset(offset - limit)} />
        <Button text="Previous" handleClick={() => setOffset(Math.max(0, offset - limit))} />
        <Button text="Next" handleClick={() => setOffset(offset + limit)} />
      </div>
    </div>
  )
}
  );
};

export default CardList;
export default CardList;
export default CardList;