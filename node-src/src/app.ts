import express from 'express';
import cors from 'cors';
import connectDB from './db';
import products from './products';
import orders from './orders';

const app = express();

// ✅ Connect to MongoDB
connectDB();

app.use(cors());
app.use(express.json());

// ✅ Product Routes
app.get('/products', async (req, res) => {
  try {
    const data = await products.getAll();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// ✅ Orders Routes
app.post('/orders', async (req, res) => {
  try {
    const order = await orders.create(req.body);
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: "Failed to create order" });
  }
});

// ✅ Start the Server
const PORT = process.env.PORT || 3080;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
