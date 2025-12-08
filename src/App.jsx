import React from 'react'
import { Route, Routes} from 'react-router-dom';

import Header from './components/Header';
import CardList from './components/CardList';
import { CartProvider } from './state/CartProvider';
import Cart from './components/Cart';
import Orders from './components/Orders';


function App() {
  
  return (
    <div className="App">
      <Header />
      
        <Routes>
         <Route path="/" element={<CardList />} />
          <Route path="/product/:id" element={<SingleView />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<Orders />} />
            </CartProvider>
      
    </div>
  );
}

export default App;