const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let products = [
  { id: 1, name: "Shirt", price: 25 },
  { id: 2, name: "Shoes", price: 50 },
  { id: 3, name: "Bag", price: 40 },
];

let orders = [];

// GET products
app.get("/products", (req, res) => {
  res.json(products);
});

// GET single product
app.get("/products/:id", (req, res) => {
  const product = products.find(p => p.id == req.params.id);
  res.json(product);
});

// POST order
app.post("/orders", (req, res) => {
  const newOrder = {
    id: orders.length + 1,
    items: req.body.items,
    total: req.body.items.reduce((sum, item) => {
      return sum + item.price * item.quantity;
    }, 0)
  };
  orders.push(newOrder);
  res.json(newOrder);
});

// GET orders
app.get("/orders", (req, res) => {
  res.json(orders);
});

app.listen(3001, () => {
  console.log("Server running on port 3001");
});