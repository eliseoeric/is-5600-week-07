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
Object.defineProperty(exports, "__esModule", { value: true });
exports.listOrders = exports.createOrder = exports.deleteProduct = exports.editProduct = exports.createProduct = exports.getProduct = exports.listProducts = exports.handleRoot = void 0;
const Products = __importStar(require("./products"));
const Orders = __importStar(require("./orders"));
// =====================
// ROOT
// =====================
const handleRoot = (req, res) => {
    res.json({ message: "API running" });
};
exports.handleRoot = handleRoot;
// =====================
// PRODUCTS
// =====================
const listProducts = async (req, res) => {
    const products = await Products.list({});
    res.json(products);
};
exports.listProducts = listProducts;
const getProduct = async (req, res, next) => {
    const product = await Products.get(req.params.id);
    if (!product)
        return next();
    res.json(product);
};
exports.getProduct = getProduct;
const createProduct = async (req, res) => {
    const product = await Products.create(req.body);
    res.json(product);
};
exports.createProduct = createProduct;
const editProduct = async (req, res, next) => {
    const product = await Products.edit(req.params.id, req.body);
    if (!product)
        return next();
    res.json(product);
};
exports.editProduct = editProduct;
const deleteProduct = async (req, res, next) => {
    const product = await Products.remove(req.params.id);
    if (!product)
        return next();
    res.json(product);
};
exports.deleteProduct = deleteProduct;
// =====================
// ORDERS
// =====================
const createOrder = async (req, res) => {
    const order = await Orders.create(req.body);
    res.json(order);
};
exports.createOrder = createOrder;
const listOrders = async (req, res) => {
    const orders = await Orders.list({});
    res.json(orders);
};
exports.listOrders = listOrders;
