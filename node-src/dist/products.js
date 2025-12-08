"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
exports.list = list;
exports.get = get;
exports.create = create;
exports.edit = edit;
exports.remove = remove;
exports.clearAll = clearAll;
exports.insertMany = insertMany;
// node-src/src/products.ts
const db_1 = __importDefault(require("./db"));
const cuid_1 = __importDefault(require("cuid"));
const ProductSchema = new db_1.default.Schema({
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
    tags: [{ title: { type: String, required: true } }],
}, { versionKey: false });
exports.Product = db_1.default.model("Product", ProductSchema);
async function list(opts = {}) {
    const { offset = 0, limit = 25, tag } = opts;
    const query = tag ? { tags: { $elemMatch: { title: tag } } } : {};
    return exports.Product.find(query).sort({ _id: 1 }).skip(offset).limit(limit);
}
function get(id) {
    return exports.Product.findById(id);
}
function create(fields) {
    return exports.Product.create(fields);
}
async function edit(id, change) {
    const doc = await exports.Product.findById(id);
    if (!doc)
        return null;
    Object.assign(doc, change);
    await doc.save();
    return doc;
}
function remove(id) {
    return exports.Product.deleteOne({ _id: id });
}
// Helpers for seeding
function clearAll() {
    return exports.Product.deleteMany({});
}
function insertMany(items) {
    return exports.Product.insertMany(items);
}
