import Card from './Card';
import Button from './Button';
import Search from './Search';
import { BASE_URL } from '../config';
import { useState, useEffect } from 'react'; // Ensure useState and useEffect are imported

const CardList = ({ data }) => {
  // Define the limit state variable and set it to 10
  const limit = 10;

  // Define the offset state variable and set it to 0
  const [offset, setOffset] = useState(0);

  // Define the products state variable and set it to the default dataset
  const [products, setProducts] = useState(data);

  useEffect(() => {
    setProducts(data.slice(offset, offset + limit));
  }, [offset, limit, data]);

  const filterTags = (tagQuery) => {
    const filtered = data.filter(product => {
      // your filtering logic here
    });
    setProducts(filtered);
  };

  // Create a function to fetch the products
  const fetchProducts = () => {
    fetch(`${BASE_URL}/products?offset=${offset}&limit=${limit}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, [offset]);

  return (
    <div className="cf pa2">
      {/* Your component content here */}
    </div>
  );
};

export default CardList;
