"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const orderSchema = new mongoose_1.default.Schema({
    buyerEmail: { type: String, required: true },
    products: [{ type: String, required: true }],
    status: { type: String, required: true, default: "pending" }
});
const Order = mongoose_1.default.model('Order', orderSchema);
const create = async (order) => {
    return await Order.create(order);
};
const getAll = async () => {
    return await Order.find();
};
exports.default = { create, getAll };
