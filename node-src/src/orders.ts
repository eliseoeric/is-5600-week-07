import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  buyerEmail: String,
  products: Array,
  status: {
    type: String,
    default: "CREATED"
  }
});

const Order = mongoose.model("Order", OrderSchema);

// REQUIRED FUNCTIONS

export const list = (query = {}) => {
  return Order.find(query);
};

export const create = (data: any) => {
  return Order.create(data);
};