"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = exports.list = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const OrderSchema = new mongoose_1.default.Schema({
    buyerEmail: String,
    products: Array,
    status: {
        type: String,
        default: "CREATED"
    }
});
const Order = mongoose_1.default.model("Order", OrderSchema);
// REQUIRED FUNCTIONS
const list = (query = {}) => {
    return Order.find(query);
};
exports.list = list;
const create = (data) => {
    return Order.create(data);
};
exports.create = create;
