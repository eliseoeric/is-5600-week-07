const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

// Enable CORS for all origins
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());

const products = [
  { id: 1, name: "Mountain Landscape", description: "Beautiful mountain scenery", price: 29.99 },
  { id: 2, name: "Ocean Waves", description: "Calming ocean waves", price: 24.99 },
  { id: 3, name: "City Skyline", description: "Modern city architecture", price: 34.99 },
  { id: 4, name: "Forest Path", description: "Serene forest pathway", price: 27.99 },
  { id: 5, name: "Abstract Colors", description: "Vibrant abstract art", price: 39.99 },
  { id: 6, name: "Wildlife Portrait", description: "Detailed animal artwork", price: 32.99 }
];

// Products endpoint
app.get('/api/products', (req, res) => {
  console.log('✅ GET /api/products - Request received');
  const offset = parseInt(req.query.offset);
  const limit = parseInt(req.query.limit);

  let result = products;
  if (!isNaN(offset) && !isNaN(limit)) {
    result = products.slice(offset, offset + limit);
  }

  res.json(result);
});

// Single product endpoint
app.get('/api/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const product = products.find(p => p.id === id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
});

// Orders endpoint
app.get('/api/orders', (req, res) => {
  res.json([]);
});

// Create order endpoint
app.post('/api/orders', (req, res) => {
  console.log('📦 Order received:', req.body);
  res.status(201).json({ 
    success: true, 
    message: 'Order created',
    order: req.body 
  });
});

// Start server - IMPORTANT: use '0.0.0.0' not 'localhost'
app.listen(PORT, '0.0.0.0', () => {
  console.log('=================================');
  console.log(`✅ Backend running on port ${PORT}`);
  console.log(`🌐 Products: http://localhost:${PORT}/api/products`);
  console.log(`🔗 Public URL: https://YOUR-URL-${PORT}.app.github.dev`);
  console.log('=================================');
});
