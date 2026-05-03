import cuid from 'cuid';
import * as db from './db';
import { ProductDocument } from './products';

type OrderStatus = 'CREATED' | 'PENDING' | 'COMPLETED';

interface OrderDocument extends db.Document {
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

const Order = db.model<OrderDocument>('Order', new db.Schema({
  _id: { type: String, default: cuid },
  buyerEmail: { type: String, required: true },
  products: [{
    type: String,
    ref: 'Product', // ref will automatically fetch associated products for us
    index: true,
    required: true
  }],
  status: {
    type: String,
    index: true,
    default: 'CREATED' as OrderStatus,
    enum: ['CREATED', 'PENDING', 'COMPLETED']
  }
}, { timestamps: true }));

async function list(options: ListOptions = {}): Promise<OrderDocument[]> {
  const { offset = 0, limit = 25, productId, status } = options;

  const productQuery = productId ? {
    products: productId
  } : {};

  const statusQuery = status ? {
    status: status,
  } : {};

  const query = {
    ...productQuery,
    ...statusQuery
  };

  const orders = await Order.find(query)
    .sort({ _id: 1 })
    .skip(offset)
    .limit(limit)
    .populate('products');

  return orders;
}

/**
 * Get an order
 */
async function get(_id: string): Promise<OrderDocument | null> {
  return Order.findById(_id).populate('products');
}

/**
 * Create an order
 */
async function create(fields: Partial<OrderDocument>): Promise<OrderDocument> {
  const order = await Order.create(fields);
  return order.populate('products');
}

export {
  create,
  get,
  list,
  OrderDocument,
  OrderStatus
};
