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
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Orders from "./Orders";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/orders" element={<Orders />} />
            </Routes>
        </Router>
    );
}

export default App;

