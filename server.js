const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Enable CORS for all origins
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Data file path
const dataFilePath = path.join(__dirname, 'data.json');

// Initial products
const initialProducts = [
  { id: 1, name: "Mountain Landscape", description: "Beautiful mountain scenery print", price: 29.99, image: "mountain.jpg" },
  { id: 2, name: "Ocean Waves", description: "Calming ocean waves art", price: 24.99, image: "ocean.jpg" },
  { id: 3, name: "City Skyline", description: "Modern city architecture print", price: 34.99, image: "city.jpg" },
  { id: 4, name: "Forest Path", description: "Serene forest pathway", price: 27.99, image: "forest.jpg" },
  { id: 5, name: "Abstract Colors", description: "Vibrant abstract art", price: 39.99, image: "abstract.jpg" },
  { id: 6, name: "Wildlife Portrait", description: "Detailed animal artwork", price: 32.99, image: "wildlife.jpg" }
];

// Initialize data.json if it doesn't exist
if (!fs.existsSync(dataFilePath)) {
  const initialData = {
    products: initialProducts,
    orders: []
  };
  fs.writeFileSync(dataFilePath, JSON.stringify(initialData, null, 2));
  console.log('Created data.json with initial products');
}

// Read data from file
function readData() {
  const data = fs.readFileSync(dataFilePath, 'utf8');
  return JSON.parse(data);
}

// Write data to file
function writeData(data) {
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
}

// ============ API ROUTES ============

// GET all products
app.get('/api/products', (req, res) => {
  console.log('GET /api/products - Request received');
  const data = readData();
  let products = data.products;

  const offset = parseInt(req.query.offset);
  const limit = parseInt(req.query.limit);

  if (!isNaN(offset) && !isNaN(limit)) {
    products = products.slice(offset, offset + limit);
  }

  res.json(products);
});

// GET single product
app.get('/api/products/:id', (req, res) => {
  const data = readData();
  const productId = parseInt(req.params.id);
  const product = data.products.find(p => p.id === productId);

  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
});

// GET all orders
app.get('/api/orders', (req, res) => {
  const data = readData();
  res.json(data.orders);
});

// POST create order
app.post('/api/orders', (req, res) => {
  const data = readData();
  const newOrder = req.body;

  newOrder.id = Date.now();
  newOrder.createdAt = new Date().toISOString();
  newOrder.status = 'completed';

  data.orders.unshift(newOrder);
  writeData(data);

  console.log(`Order created with ID: ${newOrder.id}`);
  res.status(201).json(newOrder);
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`=================================`);
  console.log(`Backend server running on port ${PORT}`);
  console.log(`Products API: http://localhost:${PORT}/api/products`);
  console.log(`Orders API: http://localhost:${PORT}/api/orders`);
  console.log(`=================================`);
});