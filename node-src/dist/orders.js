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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.list = exports.get = exports.create = void 0;
const cuid_1 = __importDefault(require("cuid"));
const db = __importStar(require("./db"));
const Order = db.model('Order', {
    _id: { type: String, default: cuid_1.default },
    buyerEmail: { type: String, required: true },
    products: [{
            type: String,
            ref: 'Product',
            index: true,
            required: true
        }],
    status: {
        type: String,
        index: true,
        default: 'CREATED',
        enum: ['CREATED', 'PENDING', 'COMPLETED']
    }
});
async function list(options = {}) {
    const { offset = 0, limit = 25, productId, status } = options;
    const productQuery = productId ? {
        products: productId
    } : {};
    const statusQuery = status ? {
        status: status,
    } : {};
    const query = {
        ...productQuery,
        ...statusQuery
    };
    const orders = await Order.find(query)
        .sort({ _id: 1 })
        .skip(offset)
        .limit(limit);
    return orders;
}
exports.list = list;
/**
 * Get an order
 */
async function get(_id) {
    return Order.findById(_id).populate('products');
}
exports.get = get;
/**
 * Create an order
 */
async function create(fields) {
    const order = await Order.create(fields);
    return order.populate('products');
}
exports.create = create;
