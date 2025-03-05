import mongoose from 'mongoose';

interface OrderDocument extends mongoose.Document {
  buyerEmail: string;
  products: string[];
  status: string;
}

const orderSchema = new mongoose.Schema<OrderDocument>({
  buyerEmail: { type: String, required: true },
  products: [{ type: String, required: true }],
  status: { type: String, required: true, default: "pending" }
});

const Order = mongoose.model<OrderDocument>('Order', orderSchema);

const create = async (order: OrderDocument) => {
  return await Order.create(order);
};

const getAll = async () => {
  return await Order.find();
};

export default { create, getAll };
