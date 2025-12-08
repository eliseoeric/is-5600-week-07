"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.list = list;
exports.get = get;
exports.create = create;
// src/orders.ts
const db_1 = __importDefault(require("./db"));
const cuid_1 = __importDefault(require("cuid"));
const OrderSchema = new db_1.default.Schema({
    _id: { type: String, default: cuid_1.default },
    buyerEmail: { type: String, required: true },
    products: [
        {
            type: String,
            ref: "Product",
            index: true,
            required: true,
        },
    ],
    status: {
        type: String,
        index: true,
        default: "CREATED",
        enum: ["CREATED", "PENDING", "COMPLETED"],
    },
}, { versionKey: false });
const Order = db_1.default.model("Order", OrderSchema);
async function list(opts = {}) {
    const { offset = 0, limit = 25, productId, status } = opts;
    const query = {};
    if (productId)
        query.products = productId;
    if (status)
        query.status = status;
    return Order.find(query).sort({ _id: 1 }).skip(offset).limit(limit);
}
function get(id) {
    return Order.findById(id).populate("products").exec();
}
async function create(fields) {
    const order = await Order.create(fields);
    await order.populate("products");
    return order;
}
