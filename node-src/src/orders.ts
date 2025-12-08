// src/orders.ts
import db from "./db";
import cuid from "cuid";

const OrderSchema = new db.Schema(
  {
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
  },
  { versionKey: false }
);

type OrderDoc = db.HydratedDocument<any>;
const Order = db.model<OrderDoc>("Order", OrderSchema);

export async function list(opts: {
  offset?: number;
  limit?: number;
  productId?: string;
  status?: string;
} = {}) {
  const { offset = 0, limit = 25, productId, status } = opts;

  const query: any = {};
  if (productId) query.products = productId;
  if (status) query.status = status;

  return Order.find(query).sort({ _id: 1 }).skip(offset).limit(limit);
}

export function get(id: string) {
  return Order.findById(id).populate("products").exec();
}

export async function create(fields: any) {
  const order = await Order.create(fields);
  await order.populate("products");
  return order;
}
