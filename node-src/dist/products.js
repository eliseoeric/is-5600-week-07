"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.edit = exports.create = exports.get = exports.list = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const ProductSchema = new mongoose_1.default.Schema({
    name: String,
    description: String,
    price: Number
});
const Product = mongoose_1.default.model("Product", ProductSchema);
// REQUIRED FUNCTIONS (MATCH api.ts)
const list = (query = {}) => {
    return Product.find(query);
};
exports.list = list;
const get = (id) => {
    return Product.findById(id);
};
exports.get = get;
const create = (data) => {
    return Product.create(data);
};
exports.create = create;
const edit = (id, data) => {
    return Product.findByIdAndUpdate(id, data, { new: true });
};
exports.edit = edit;
const remove = (id) => {
    return Product.findByIdAndDelete(id);
};
exports.remove = remove;
