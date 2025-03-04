// Import necessary React and routing libraries
import React from 'react';
import { Route, Routes } from 'react-router-dom';

// Import the components that will be rendered for different routes
import Header from './components/Header';
import CardList from './components/CardList';
import SingleView from './components/SingleView';
import { CartProvider } from './state/CartProvider'; // Import CartProvider to provide cart context to the app
import Cart from './components/Cart';
import Orders from './components/Orders';

/**
 * App Component:
 * This is the main component that renders the application. It includes a navigation header,
 * provides cart state to the app through CartProvider, and defines the routes for the different
 * pages of the app using react-router-dom.
 */
function App() {

  return (
    <div className="App">
      {/* CartProvider wraps the entire app, making cart context available to any component */}
      <CartProvider>
        {/* Header component contains the navigation or branding for the app */}
        <Header />

        {/* Routes define the paths that render different components based on the URL */}
        <Routes>
          {/* The home page ("/") renders the CardList component which shows a list of products */}
          <Route path="/" element={<CardList />} />

          {/* The product detail page ("/product/:id") renders the SingleView component */}
          {/* ":id" is a URL parameter representing the ID of the product to view */}
          <Route path="/product/:id" element={<SingleView />} />

          {/* The cart page ("/cart") renders the Cart component, showing items in the user's cart */}
          <Route path="/cart" element={<Cart />} />

          {/* The orders page ("/orders") renders the Orders component, showing the user's past orders */}
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </CartProvider>
    </div>
  );
}

export default App;