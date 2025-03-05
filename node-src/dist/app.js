"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const db_1 = __importDefault(require("./db"));
const products_1 = __importDefault(require("./products"));
const orders_1 = __importDefault(require("./orders"));
const app = (0, express_1.default)();
// ✅ Connect to MongoDB
(0, db_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// ✅ Product Routes
app.get('/products', async (req, res) => {
    try {
        const data = await products_1.default.getAll();
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch products" });
    }
});
// ✅ Orders Routes
app.post('/orders', async (req, res) => {
    try {
        const order = await orders_1.default.create(req.body);
        res.status(201).json(order);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to create order" });
    }
});
// ✅ Start the Server
const PORT = process.env.PORT || 3080;
app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
});
