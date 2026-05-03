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
const path = __importStar(require("path"));
const Products = __importStar(require("./products"));
const Orders = __importStar(require("./orders"));
const auto_catch_1 = __importDefault(require("./lib/auto-catch"));
/**
 * Handle the root route
 */
function handleRoot(req, res) {
    res.sendFile(path.join(__dirname, '/index.html'));
}
/**
 * List all products
 */
async function listProducts(req, res) {
    const { offset = 0, limit = 25, tag } = req.query;
    res.json(await Products.list({
        offset: Number(offset),
        limit: Number(limit),
        tag
    }));
}
/**
 * Get a single product
 */
async function getProduct(req, res, next) {
    const { id } = req.params;
    const product = await Products.get(id);
    if (!product) {
        return next();
    }
    return res.json(product);
}
/**
 * Create a product
 */
async function createProduct(req, res) {
    const product = await Products.create(req.body);
    res.json(product);
}
/**
 * Edit a product
 */
async function editProduct(req, res, next) {
    const { id } = req.params;
    const product = await Products.edit(id, req.body);
    if (!product) {
        return next();
    }
    return res.json(product);
}
/**
 * Delete a product
 */
async function deleteProduct(req, res, next) {
    const { id } = req.params;
    const product = await Products.remove(id);
    if (!product) {
        return next();
    }
    return res.json(product);
}
/**
 * Create an order
 */
async function createOrder(req, res) {
    const order = await Orders.create(req.body);
    res.json(order);
}
/**
 * List all orders
 */
async function listOrders(req, res) {
    const { offset = 0, limit = 25 } = req.query;
    res.json(await Orders.list({
        offset: Number(offset),
        limit: Number(limit)
    }));
}
exports.default = (0, auto_catch_1.default)({
    handleRoot,
    listProducts,
    getProduct,
    createProduct,
    editProduct,
    deleteProduct,
    createOrder,
    listOrders
});
