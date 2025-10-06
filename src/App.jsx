import React from 'react'
import { Route, Routes} from 'react-router-dom';

import Header from './components/Header';
import CardList from './components/CardList';
import SingleView from './components/SingleView';
import productData from './data/full-products';


function App() {
  
  return (
    <div className="App">
      <Header />
      
        <Routes>
          <Route path="/" element={<CardList data={productData} />} />
          <Route path="/product/:id" element={<SingleView data={productData} />} />
        </Routes>
      
    </div>
  );
}

export default App;
// App.js

  return (
    <div className="App">
      <Header />
      
        <Routes>
          <Route path="/" element={<CardList />} />
          <Route path="/product/:id" element={<SingleView />} />
        </Routes>
      
    </div>
  );
  // App.js

 return (
    <div className="App">
      <CartProvider>
        <Header />
      
        <Routes>
          <Route path="/" element={<CardList />} />
          <Route path="/product/:id" element={<SingleView />} />
        </Routes>
      </CartProvider>
    </div>
  );
  // App.js

return (
    <div className="App">
      <CartProvider>
        <Header />
      
        <Routes>
          <Route path="/" element={<CardList />} />
          <Route path="/product/:id" element={<SingleView />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </CartProvider>
    </div>
  );
  import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import Cart from "./components/Cart";
import Orders from "./components/Orders";

const App = () => {
  return (
    <CartProvider>
      <Router>
        <nav>
          <Link to="/">Cart</Link> | <Link to="/orders">Orders</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Cart />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </Router>
    </CartProvider>
  );
};

export default App;
