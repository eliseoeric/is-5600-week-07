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
const api_1 = __importDefault(require("./api"));
const middleware = __importStar(require("./middleware"));
const body_parser_1 = __importDefault(require("body-parser"));
const Products = __importStar(require("./products"));
const Orders = __importStar(require("./orders"));
const cuid_1 = __importDefault(require("cuid"));
const productsFile = path.join(__dirname, '../data/full-products.json');
// Set the port
const port = process.env.PORT ? parseInt(process.env.PORT) : 3080;
// Boot the app
const app = (0, express_1.default)();
// Register the public directory
app.use(express_1.default.static(__dirname + '/public'));
// register the routes
app.use(body_parser_1.default.json());
app.use(middleware.cors);
// Register root route
app.get('/', api_1.default.handleRoot);
// Register Products routes
app.get('/products', api_1.default.listProducts);
app.get('/products/:id', api_1.default.getProduct);
app.put('/products/:id', api_1.default.editProduct);
app.delete('/products/:id', api_1.default.deleteProduct);
app.post('/products', api_1.default.createProduct);
Products.list().then((products) => {
    if (products.length === 0) {
        console.log('No products found, loading from file');
        fs_1.promises.readFile(productsFile, 'utf-8').then((data) => {
            const products = JSON.parse(data);
            products.forEach((product) => {
                if (!product.price) {
                    product.price = Math.floor(Math.random() * 100) + 1; // Set random price between 1 and 100
                }
                console.log('Creating product', product);
                Products.create(product);
            });
        }).then(() => {
            // Create 5 orders using the products
            Products.list().then((products) => {
                if (products.length > 0) {
                    for (let i = 0; i < 5; i++) {
                        const order = {
                            _id: (0, cuid_1.default)(),
                            buyerEmail: `buyer${i}@example.com`,
                            products: [products[Math.floor(Math.random() * products.length)]._id],
                            status: 'CREATED'
                        };
                        console.log('Creating order', order);
                        Orders.create(order);
                    }
                }
            });
        });
    }
});
// Register Order Routes
app.get('/orders', api_1.default.listOrders);
app.post('/orders', api_1.default.createOrder);
// edit and delete routes
// Boot the server
app.listen(port, () => console.log(`Server listening on port ${port}`));
