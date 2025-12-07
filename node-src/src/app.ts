import express from 'express';
import { promises as fs } from 'fs';
import * as path from 'path';
import api from './api';
import * as middleware from './middleware';
import bodyParser from 'body-parser';
import * as Products from './products';
import * as Orders from './orders';
import cuid from 'cuid';

// Path to products JSON
const productsFile = path.join(__dirname, '../data/full-products.json');

// Set the port
const port: number = process.env.PORT ? parseInt(process.env.PORT) : 3080;

// Boot the app
const app: express.Application = express();

// Serve public directory
app.use(express.static(path.join(__dirname, 'public')));

// Middleware
app.use(bodyParser.json());
app.use(middleware.cors);

// Handle OPTIONS requests for all routes (CORS preflight)
app.options('*', middleware.cors);

// Root route
app.get('/', api.handleRoot);

// Product routes
app.get('/products', api.listProducts);
app.post('/products', api.createProduct);
app.put('/products/:id', api.editProduct);
app.delete('/products/:id', api.deleteProduct);

// Order routes
app.get('/orders', api.listOrders);
app.post('/orders', api.createOrder);
// Add edit/delete routes if needed

// --- Seed Products & Orders ---
async function seedProducts() {
    try {
        const mongoose = await import('./db');

        // Wait for MongoDB connection
        if (mongoose.default.connection.readyState !== 1) {
            console.log('Waiting for MongoDB connection...');
            await new Promise((resolve) => {
                mongoose.default.connection.once('connected', resolve);
                setTimeout(() => {
                    console.error('MongoDB connection timeout');
                    resolve(null);
                }, 10000);
            });
        }

        const existingProducts = await Products.list();
        if (existingProducts.length === 0) {
            console.log('No products found in DB, loading from file...');

            // Check if file exists
            try {
                await fs.access(productsFile);
            } catch {
                console.error(`Products file not found at: ${productsFile}`);
                return;
            }

            const data = await fs.readFile(productsFile, 'utf-8');
            const productsData = JSON.parse(data);

            // Create products sequentially
            const createdProducts: any[] = [];
            for (const product of productsData) {
                const productData: any = {
                    ...product,
                    _id: product._id || product.id,
                    price: product.price || Math.floor(Math.random() * 100) + 1,
                };
                delete productData.id;

                try {
                    const created = await Products.create(productData);
                    createdProducts.push(created);
                    console.log(`Created product: ${productData._id}`);
                } catch (err: any) {
                    console.error(`Error creating product ${productData._id}:`, err.message);
                }
            }

            // Create sample orders
            console.log('Creating sample orders...');
            for (let i = 0; i < 5; i++) {
                const order = {
                    _id: cuid(),
                    buyerEmail: `buyer${i}@example.com`,
                    products: [createdProducts[Math.floor(Math.random() * createdProducts.length)]._id],
                    status: 'CREATED',
                };
                try {
                    await Orders.create(order);
                    console.log(`Created order: ${order._id}`);
                } catch (err) {
                    console.error('Error creating order:', err);
                }
            }

            console.log('Seeding completed!');
        } else {
            console.log(`Database already has ${existingProducts.length} products`);
        }
    } catch (error: any) {
        console.error('Error seeding products:', error);
        console.error('Stack:', error.stack);
    }
}

// Seed products after a short delay to ensure MongoDB connection
setTimeout(seedProducts, 2000);

// Boot the server
app.listen(port, () => console.log(`Server listening on port ${port}`));
