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
exports.destroy = exports.edit = exports.create = exports.get = exports.list = void 0;
const cuid_1 = __importDefault(require("cuid"));
const db = __importStar(require("./db"));
// Define our Product Model
const Product = db.model('Product', {
    _id: { type: String, default: cuid_1.default },
    description: { type: String },
    alt_description: { type: String },
    likes: { type: Number, required: true },
    urls: {
        regular: { type: String, required: true },
        small: { type: String, required: true },
        thumb: { type: String, required: true },
    },
    links: {
        self: { type: String, required: true },
        html: { type: String, required: true },
    },
    user: {
        id: { type: String, required: true },
        first_name: { type: String, required: true },
        last_name: { type: String },
        portfolio_url: { type: String },
        username: { type: String, required: true },
    },
    tags: [{
            title: { type: String, required: true },
        }],
    price: { type: Number, required: true },
});
/**
 * List products
 */
async function list(options = {}) {
    const { offset = 0, limit = 25, tag } = options;
    const query = tag ? {
        tags: {
            $elemMatch: {
                title: tag
            }
        }
    } : {};
    return Product.find(query)
        .skip(offset)
        .limit(limit);
}
exports.list = list;
/**
 * Get a single product
 */
async function get(_id) {
    return Product.findById(_id);
}
exports.get = get;
/**
 * Create a product
 */
async function create(fields) {
    return Product.create(fields);
}
exports.create = create;
/**
 * Edit a product
 */
async function edit(_id, change) {
    const product = await get(_id);
    if (!product)
        return null;
    Object.keys(change).forEach(key => {
        product[key] = change[key];
    });
    return product.save();
}
exports.edit = edit;
/**
 * Delete a product
 */
async function remove(_id) {
    const product = await get(_id);
    if (!product)
        return null;
    await product.remove();
    return product;
}
exports.destroy = remove;
