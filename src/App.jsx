import React from 'react'
import { Route, Routes} from 'react-router-dom';

import Header from './components/Header';
import CardList from './components/CardList';
import SingleView from './components/SingleView';
import productData from './data/full-products';

import { CartProvider } from "./state/CartProvider";
import CardList from "./components/CardList";
import Cart from "./components/Cart";

function App() {
  
  return (
    <div className="App">
      <Header />
      
        <Routes>
          <Route path="/" element={<CardList data={productData} />} />
          <Route path="/product/:id" element={<SingleView data={productData} />} />
        </Routes>
      
    </div>
    <CartProvider>
      <h1>Store</h1>
      <CardList />
      <Cart />
    </CartProvider>
  );
}

export default App;
export default App;