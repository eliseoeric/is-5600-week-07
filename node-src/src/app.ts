import express from 'express';
import { promises as fs } from 'fs';
import * as path from 'path';
import * as api from './api';
import * as middleware from './middleware';
import bodyParser from 'body-parser';
import * as Products from './products';
import * as Orders from './orders';
import cuid from 'cuid';

// File path for seed data
const productsFile = path.join(__dirname, '../data/full-products.json');

// Port config
const port: number = process.env.PORT
  ? parseInt(process.env.PORT)
  : 3080;

const app: express.Application = express();

// Middleware
app.use(bodyParser.json());
app.use(middleware.cors);

// =====================
// ROUTES
// =====================

// Root route (simple JSON response)
app.get('/', api.handleRoot);

// Products
app.get('/products', api.listProducts);
app.get('/products/:id', api.getProduct);
app.post('/products', api.createProduct);
app.put('/products/:id', api.editProduct);
app.delete('/products/:id', api.deleteProduct);

// Orders
app.get('/orders', api.listOrders);
app.post('/orders', api.createOrder);

// Test route (for debugging)
app.get('/test', (req, res) => {
  res.json({ ok: true });
});

// =====================
// SEED DATA (SAFE - NON BLOCKING)
// =====================

async function seedData() {
  try {
    const existingProducts = await Products.list();

    if (existingProducts.length === 0) {
      console.log('Seeding products...');

      const data = await fs.readFile(productsFile, 'utf-8');
      const products = JSON.parse(data);

      for (const product of products) {
        if (!product.price) {
          product.price = Math.floor(Math.random() * 100) + 1;
        }
        await Products.create(product);
      }

      const seededProducts = await Products.list();

      console.log('Seeding orders...');
      for (let i = 0; i < 5; i++) {
        const order = {
          _id: cuid(),
          buyerEmail: `buyer${i}@example.com`,
          products: [
            seededProducts[
              Math.floor(Math.random() * seededProducts.length)
            ]._id
          ],
          status: 'CREATED'
        };

        await Orders.create(order);
      }

      console.log('Seeding complete');
    }
  } catch (error) {
    console.error('Seed error:', error);
  }
}

// =====================
// START SERVER
// =====================

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);

  // Run seed AFTER server starts (non-blocking)
  seedData();
});