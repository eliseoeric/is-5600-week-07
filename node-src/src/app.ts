import express from 'express';
import { promises as fs } from 'fs';
import * as path from 'path';
import api from './api';
import * as middleware from './middleware';
import bodyParser from 'body-parser';
import * as Products from './products';
import * as Orders from './orders';
import cuid from 'cuid';

const productsFile = path.join(__dirname, '../data/full-products.json');

// Set the port
const port: number = process.env.PORT ? parseInt(process.env.PORT) : 3080;

// Boot the app
const app: express.Application = express();

// Register the public directory
app.use(express.static(__dirname + '/public'));

// register the routes
app.use(bodyParser.json());
app.use(middleware.cors);

// Handle OPTIONS requests for all routes (CORS preflight)
app.options('*', middleware.cors);

// Register root route
app.get('/', api.handleRoot);

// Register Products routes
app.get('/products', api.listProducts);
app.get('/products/:id', api.getProduct);
app.put('/products/:id', api.editProduct);
app.delete('/products/:id', api.deleteProduct);
app.post('/products', api.createProduct);

// Seed products from JSON file if database is empty
async function seedProducts() {
    try {
        // Wait for MongoDB connection
        const mongoose = await import('./db');
        if (mongoose.default.connection.readyState !== 1) {
            console.log('Waiting for MongoDB connection...');
            await new Promise((resolve) => {
                mongoose.default.connection.once('connected', resolve);
                // Timeout after 10 seconds
                setTimeout(() => {
                    console.error('MongoDB connection timeout');
                    resolve(null);
                }, 10000);
            });
        }

        const existingProducts = await Products.list();
        if (existingProducts.length === 0) {
            console.log('No products found, loading from file');
            console.log('Products file path:', productsFile);
            
            // Check if file exists
            try {
                await fs.access(productsFile);
            } catch (fileError) {
                console.error(`Products file not found at: ${productsFile}`);
                console.error('Please ensure the file exists in node-src/data/full-products.json');
                return;
            }
            
            const data = await fs.readFile(productsFile, 'utf-8');
            const productsData = JSON.parse(data);
            console.log(`Loaded ${productsData.length} products from file`);
            
            // Convert products and add price if missing
            const productsToCreate = productsData.map((product: any) => {
                // Convert 'id' to '_id' if present
                const productData: any = {
                    ...product,
                    _id: product._id || product.id,
                };
                
                // Remove 'id' if it exists (we use _id)
                if (productData.id && productData._id) {
                    delete productData.id;
                }
                
                // Add price if missing
                if (!productData.price) {
                    productData.price = Math.floor(Math.random() * 100) + 1;
                }
                
                return productData;
            });
            
            // Create products sequentially to avoid race conditions
            console.log(`Creating ${productsToCreate.length} products...`);
            let createdCount = 0;
            for (const product of productsToCreate) {
                try {
                    await Products.create(product);
                    createdCount++;
                    if (createdCount % 10 === 0) {
                        console.log(`Created ${createdCount}/${productsToCreate.length} products...`);
                    }
                } catch (error: any) {
                    console.error(`Error creating product ${product._id || product.id}:`, error.message);
                }
            }
            
            console.log(`Successfully created ${createdCount} products`);
            
            // Create sample orders after products are created
            const createdProducts = await Products.list();
            if (createdProducts.length > 0) {
                console.log('Creating sample orders...');
                for (let i = 0; i < 5; i++) {
                    try {
                        const order = {
                            _id: cuid(),
                            buyerEmail: `buyer${i}@example.com`,
                            products: [createdProducts[Math.floor(Math.random() * createdProducts.length)]._id],
                            status: 'CREATED'
                        };
                        await Orders.create(order);
                        console.log(`Created order: ${order._id}`);
                    } catch (error) {
                        console.error(`Error creating order:`, error);
                    }
                }
                console.log('Orders seeded successfully');
            }
        } else {
            console.log(`Database already has ${existingProducts.length} products`);
        }
    } catch (error: any) {
        console.error('Error seeding products:', error);
        console.error('Stack:', error.stack);
    }
}

// Start seeding after routes are registered (wait a bit for MongoDB to connect)
setTimeout(() => {
    seedProducts();
}, 2000);

// Register Order Routes
app.get('/orders', api.listOrders);
app.post('/orders', api.createOrder);
// edit and delete routes

// Boot the server
app.listen(port, () => console.log(`Server listening on port ${port}`));