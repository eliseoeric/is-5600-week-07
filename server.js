// server.js
const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors());  // To allow requests from different origins (frontend)
app.use(express.json());  // For parsing application/json

// Sample product data (replace with actual data or a database)
const products = [
  { id: 1, name: 'Product 1', price: 100 },
  { id: 2, name: 'Product 2', price: 200 },
];

// Get all products
app.get('/products', (req, res) => {
  res.json(products);
});

// Create an order (this will be used by your React app)
app.post('/orders', (req, res) => {
  const newOrder = req.body;  // Get order data sent by React
  console.log('Order received:', newOrder);
  res.status(201).json({ message: 'Order created', order: newOrder });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
