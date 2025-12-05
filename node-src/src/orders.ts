// node-src/src/orders.ts
import cuid from 'cuid';
import * as db from './db';
import type { ProductDocument } from './products';

export type OrderStatus = 'CREATED' | 'PENDING' | 'COMPLETED';

export interface OrderDocument extends db.Document {
  _id: string;
  buyerEmail: string;
  products: (string | ProductDocument)[];
  status: OrderStatus;
}

export interface ListOptions {
  offset?: number;
  limit?: number;
  productId?: string;
  status?: OrderStatus;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Order = db.model<any>('Order', {
  _id: { type: String, default: cuid },
  buyerEmail: { type: String, required: true },
  products: [
    {
      type: String,
      ref: 'Product',
      index: true,
      required: true,
    },
  ],
  status: {
    type: String,
    index: true,
    default: 'CREATED',
    enum: ['CREATED', 'PENDING', 'COMPLETED'],
  },
});

async function list(options: ListOptions = {}): Promise<OrderDocument[]> {
  const { offset = 0, limit = 25, productId, status } = options;

  const productQuery = productId
    ? {
        products: productId,
      }
    : {};

  const statusQuery = status
    ? {
        status,
      }
    : {};

  const query = {
    ...productQuery,
    ...statusQuery,
  };

  const orders = await Order.find(query)
    .sort({ _id: 1 })
    .skip(offset)
    .limit(limit);

  return orders as OrderDocument[];
}

/**
 * Get an order
 */
async function get(_id: string): Promise<OrderDocument | null> {
  return Order.findById(_id).populate('products') as Promise<OrderDocument | null>;
}

/**
 * Create an order
 */
async function create(
  fields: Partial<OrderDocument>
): Promise<OrderDocument> {
  const order = await Order.create(fields);
  return order.populate('products') as Promise<OrderDocument>;
}

export { create, get, list };
