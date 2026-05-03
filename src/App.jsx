import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom';

import Header from './components/Header';
import CardList from './components/CardList';
import SingleView from './components/SingleView';
import Cart from './components/Cart';
import Orders from './components/Orders';

function App() {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id || item._id === product._id);
      if (existingItem) {
        return prevItems.map((item) =>
          (item.id === product.id || item._id === product._id)
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId && item._id !== productId));
  };

  const updateItemQuantity = (productId, change) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) =>
          (item.id === productId || item._id === productId)
            ? { ...item, quantity: Math.max(0, item.quantity + change) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const cartQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="App">
      <Header totalItems={cartQuantity} />

      <Routes>
        <Route path="/" element={<CardList onAddToCart={addToCart} />} />
        <Route path="/product/:id" element={<SingleView onAddToCart={addToCart} />} />
        <Route
          path="/cart"
          element={
            <Cart
              cartItems={cartItems}
              removeFromCart={removeFromCart}
              updateItemQuantity={updateItemQuantity}
            />
          }
        />
        <Route path="/orders" element={<Orders />} />
      </Routes>
    </div>
  );
}

export default App;
