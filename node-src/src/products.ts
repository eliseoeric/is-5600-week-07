import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number
});

const Product = mongoose.model("Product", ProductSchema);

// REQUIRED FUNCTIONS (MATCH api.ts)

export const list = (query = {}) => {
  return Product.find(query);
};

export const get = (id: string) => {
  return Product.findById(id);
};

export const create = (data: any) => {
  return Product.create(data);
};

export const edit = (id: string, data: any) => {
  return Product.findByIdAndUpdate(id, data, { new: true });
};

export const remove = (id: string) => {
  return Product.findByIdAndDelete(id);
};