import React, { useState, useEffect } from 'react'
import { Route, Routes} from 'react-router-dom';
import { BASE_URL } from './config';

import Header from './components/Header';
import CardList from './components/CardList';
import SingleView from './components/SingleView';

import CartProvider from './state/CartProvider';

function App() {

    // Define the state object for product data
      const [products, setProducts] = useState([]);

        // Create a function to fetch the products
          const fetchProducts = () => {
                fetch(`${BASE_URL}/products`)
                      .then((res) => res.json())
                            .then((data) => {
                                      setProducts(data);
                                            });
                                              };

                                                // Use the useEffect hook to fetch the products when the component boots
                                                  useEffect(() => {
                                                        fetchProducts();
                                                          }, []);
  
  return (
        <CartProvider>
    <div className="App">
      <Header />
      
        <Routes>
          <Route path="/" element={<CardList />} />
          <Route path="/product/:id" element={<SingleView data={products} />} />
        </Routes>
      
    </div>
        </CartProvider>
  );
}

export default App;
