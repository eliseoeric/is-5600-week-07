// node-src/src/orders.ts
import cuid from 'cuid';
import db from './db';

const { Schema, model } = db;

// Define OrderStatus enum
export enum OrderStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled'
}

// Define OrderItem interface
export interface OrderItem {
  productId: string;
  quantity: number;
  price: number;
  name?: string;
}

// Define OrderDocument interface
export interface OrderDocument extends db.mongoose.Document {
  id: string;
  buyerEmail: string;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  createdAt: Date;
  updatedAt: Date;
}

// Define the schema
const orderSchema = new Schema<OrderDocument>({
  id: { type: String, default: cuid },
  buyerEmail: { type: String, required: true },
  items: [{
    productId: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    name: { type: String }
  }],
  total: { type: Number, required: true },
  status: { type: String, enum: Object.values(OrderStatus), default: OrderStatus.PENDING },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Create the model
const Order = model<OrderDocument>('Order', orderSchema);

// Function to get all orders
export async function list(limit = 25, offset = 0) {
  const orders = await Order.find({})
    .limit(limit)
    .skip(offset)
    .sort({ createdAt: -1 })
    .lean()
    .exec() as OrderDocument[];
  
  return orders;
}

// Function to get order by ID
export async function get(_id: string) {
  const order = await Order.findOne({ id: _id }).lean().exec();
  return order as OrderDocument | null;
}

// Function to create an order
export async function create(fields: Partial<OrderDocument>) {
  const order = await Order.create(fields);
  return order as OrderDocument;
}

// Function to update order status
export async function updateStatus(_id: string, status: OrderStatus) {
  const order = await Order.findOneAndUpdate(
    { id: _id },
    { status, updatedAt: Date.now() },
    { new: true }
  ).lean().exec();
  
  return order as OrderDocument | null;
}

export default {
  list,
  get,
  create,
  updateStatus
};