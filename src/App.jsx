// App.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { CartProvider } from './state/CartProvider';
import Cart from './components/Cart';
import Orders from './components/Orders';
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




