import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'tachyons/css/tachyons.min.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
import React, { useState, useEffect } from 'react';

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);

  // Fetch product data from Node backend
  useEffect(() => {
    fetch('http://localhost:5000/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error('Error fetching products:', err));
  }, []);

  // Add item to cart
  const addToCart = (product) => {
    setCart(prev => [...prev, product]);
  };

  // Submit cart to backend as a new order
  const submitOrder = () => {
    fetch('http://localhost:5000/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cart),
    })
      .then(res => res.json())
      .then(order => {
        setOrders(prev => [...prev, order]);
        setCart([]); // Clear cart after order
      })
      .catch(err => console.error('Error submitting order:', err));
  };

  return (
    <div className="pa4">
      <h1 className="f2">React Shop</h1>

      {/* Products */}
      <section>
        <h2 className="f3">Products</h2>
        <div className="flex flex-wrap">
          {products.map(product => (
            <div key={product.id} className="ba pa3 ma2 w5">
              <h3 className="f5">{product.name}</h3>
              <p>${product.price}</p>
              <button
                onClick={() => addToCart(product)}
                className="bg-blue white pa2 br2 mt2"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Cart */}
      <section className="mt4">
        <h2 className="f3">Cart</h2>
        {cart.length === 0 && <p>No items in cart</p>}
        {cart.map((item, index) => (
          <p key={index}>{item.name} - ${item.price}</p>
        ))}
        {cart.length > 0 && (
          <button
            onClick={submitOrder}
            className="bg-green white pa2 br2 mt3"
          >
            Submit Order
          </button>
        )}
      </section>

      {/* Orders */}
      <section className="mt4">
        <h2 className="f3">Orders</h2>
        {orders.map(order => (
          <div key={order.id} className="ba pa2 ma2">
            <h4>Order #{order.id}</h4>
            {order.items.map((item, idx) => (
              <p key={idx}>{item.name} - ${item.price}</p>
            ))}
          </div>
        ))}
      </section>
    </div>
  );
}

export default App;
