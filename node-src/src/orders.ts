import cuid from "cuid";
import * as db from "./db";
import { ProductDocument } from "./products";

export type OrderStatus = "CREATED" | "PENDING" | "COMPLETED";

export interface OrderDocument extends db.Document {
  _id: string;
  buyerEmail: string;
  products: string[] | ProductDocument[];
  status: OrderStatus;
}

interface ListOptions {
  offset?: number;
  limit?: number;
  productId?: string;
  status?: OrderStatus;
}

const OrderSchema = new db.Schema<OrderDocument>({
  _id: { type: String, default: cuid },
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
});

const Order = db.model<OrderDocument>("Order", OrderSchema);

async function list(options: ListOptions = {}): Promise<any[]> {
  const { offset = 0, limit = 25, productId, status } = options;

  const productQuery = productId ? { products: productId } : {};
  const statusQuery = status ? { status } : {};
  const query = { ...productQuery, ...statusQuery };

  return Order.find(query).sort({ _id: 1 }).skip(offset).limit(limit);
}

async function get(_id: string): Promise<any> {
  return Order.findById(_id).populate("products");
}

async function create(fields: Partial<OrderDocument>): Promise<any> {
  const order = await Order.create(fields);
  return order.populate("products");
}

export { create, get, list };