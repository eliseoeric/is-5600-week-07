require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const MONGO_URL =
  process.env.MONGO_URL ||
  "mongodb://root:example@127.0.0.1:27017/fullstack_prints?authSource=admin";

const PORT = process.env.PORT || 3080;
mongoose
  .connect(MONGO_URL)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

const productSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    price: Number,
    image: String
  },
  { timestamps: true }
);

const orderItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  quantity: Number
});

const orderSchema = new mongoose.Schema(
  {
    buyerEmail: String,
    items: [orderItemSchema],
    status: { type: String, default: "created" }
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
const Order = mongoose.model("Order", orderSchema);
app.get("/", (req, res) => {
  res.send("API running");
});
app.get("/products", async (req, res) => {
  const offset = parseInt(req.query.offset || "0", 10);
  const limit = parseInt(req.query.limit || "12", 10);

  const products = await Product.find({})
    .skip(offset)
    .limit(limit)
    .sort({ createdAt: 1 });

  res.json(products);
});
app.get("/products/:id", async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  if (!product) return res.status(404).json({ message: "Product not found" });
  res.json(product);
});
app.post("/orders", async (req, res) => {
  try {
    const { buyerEmail, items } = req.body;
    const order = await Order.create({ buyerEmail, items });
    res.status(201).json(order);
  } catch (err) {
    console.error("Error creating order", err);
    res.status(400).json({ message: "Error creating order" });
  }
});
app.get("/orders", async (req, res) => {
  const orders = await Order.find({}).sort({ createdAt: -1 }).lean();
  res.json(orders);
});
app.listen(PORT, () => {
  console.log(`API listening on port ${PORT}`);
});
