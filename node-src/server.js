
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 5000;


const corsOptions = {
  origin: "https://laughing-space-funicular-pj54rpg9vjqj37v9r-3000.app.github.dev", 
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type"],
};

app.use(cors(corsOptions));


app.use(bodyParser.json());


let orders = [];


app.options("*", cors(corsOptions));


app.post("/orders", (req, res) => {
  const order = req.body;
  if (!order || Object.keys(order).length === 0) {
    return res.status(400).json({ error: "Order data is required" });
  }

  const newOrder = {
    _id: Date.now().toString(),
    status: "PENDING",
    ...order,
  };
  orders.push(newOrder);
  res.status(201).json(newOrder);
});


app.get("/orders", (req, res) => {
  res.json(orders);
});


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
