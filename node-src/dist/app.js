"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = require("fs");
const path = __importStar(require("path"));
const api = __importStar(require("./api"));
const middleware = __importStar(require("./middleware"));
const body_parser_1 = __importDefault(require("body-parser"));
const Products = __importStar(require("./products"));
const Orders = __importStar(require("./orders"));
const cuid_1 = __importDefault(require("cuid"));
// File path for seed data
const productsFile = path.join(__dirname, '../data/full-products.json');
// Port config
const port = process.env.PORT
    ? parseInt(process.env.PORT)
    : 3080;
const app = (0, express_1.default)();
// Middleware
app.use(body_parser_1.default.json());
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
            const data = await fs_1.promises.readFile(productsFile, 'utf-8');
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
                    _id: (0, cuid_1.default)(),
                    buyerEmail: `buyer${i}@example.com`,
                    products: [
                        seededProducts[Math.floor(Math.random() * seededProducts.length)]._id
                    ],
                    status: 'CREATED'
                };
                await Orders.create(order);
            }
            console.log('Seeding complete');
        }
    }
    catch (error) {
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
