const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { v4: uuid } = require("uuid");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Load products from your JSON file
const products = require("../src/data/full-products.json");

// In-memory orders
let orders = [];

// GET /products with pagination
app.get("/products", (req, res) => {
  const offset = parseInt(req.query.offset) || 0;
  const limit = parseInt(req.query.limit) || 10;

  const result = products.slice(offset, offset + limit);
  res.json(result);
});

// GET single product by ID
app.get("/products/:id", (req, res) => {
  const id = req.params.id;
  const product = products.find((p) => p.id === id || p._id === id);

  if (!product) return res.status(404).json({ error: "Not found" });

  res.json(product);
});

// GET orders
app.get("/orders", (req, res) => {
  res.json(orders);
});

// POST new order
app.post("/orders", (req, res) => {
  const { buyerEmail, products } = req.body;

  const newOrder = {
    _id: uuid(),
    buyerEmail,
    products,
    status: "Pending",
  };

  orders.push(newOrder);
  res.json(newOrder);
});

// Start server
const PORT = 3080;
app.listen(PORT, () => console.log(`API running on port ${PORT}`));
