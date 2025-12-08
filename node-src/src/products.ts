// node-src/src/products.ts
import db from "./db";
import cuid from "cuid";

const ProductSchema = new db.Schema(
  {
    _id: { type: String, default: cuid },
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
  },
  { versionKey: false }
);

export type ProductDoc = db.HydratedDocument<any>;
export const Product = db.model<ProductDoc>("Product", ProductSchema);

export async function list(opts: { offset?: number; limit?: number; tag?: string } = {}) {
  const { offset = 0, limit = 25, tag } = opts;
  const query = tag ? { tags: { $elemMatch: { title: tag } } } : {};
  return Product.find(query).sort({ _id: 1 }).skip(offset).limit(limit);
}

export function get(id: string) {
  return Product.findById(id);
}

export function create(fields: any) {
  return Product.create(fields);
}

export async function edit(id: string, change: any) {
  const doc = await Product.findById(id);
  if (!doc) return null;
  Object.assign(doc, change);
  await doc.save();
  return doc;
}

export function remove(id: string) {
  return Product.deleteOne({ _id: id });
}

// Helpers for seeding
export function clearAll() {
  return Product.deleteMany({});
}
export function insertMany(items: any[]) {
  return Product.insertMany(items);
}
