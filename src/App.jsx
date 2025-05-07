import React from 'react'
import { Route, Routes} from 'react-router-dom';

import Header from './components/Header';
import CardList from './components/CardList';
import SingleView from './components/SingleView';
import Cart from './components/Cart';
import Orders from './components/Orders';
import { CartProvider } from './state/CartProvider';

function App() {
  
  return (
    <div className="App">
            <CartProvider>

      <Header />
      
        <Routes>
        <Route path="/" element={<CardList />} />
          <Route path="/product/:id" element={<SingleView />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
        </CartProvider>

    </div>
  );
}

export default App;
