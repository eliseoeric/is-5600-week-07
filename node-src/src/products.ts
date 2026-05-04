import cuid from "cuid";
import * as db from "./db";

interface ProductUrls {
  regular: string;
  small: string;
  thumb: string;
}

interface ProductLinks {
  self: string;
  html: string;
}

interface ProductUser {
  id: string;
  first_name: string;
  last_name?: string;
  portfolio_url?: string;
  username: string;
}

interface ProductTag {
  title: string;
}

export interface ProductDocument extends db.Document {
  _id: string;
  description?: string;
  alt_description?: string;
  likes: number;
  urls: ProductUrls;
  links: ProductLinks;
  user: ProductUser;
  tags: ProductTag[];
  price?: number;
}

const ProductSchema = new db.Schema<ProductDocument>({
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
  tags: [
    {
      title: { type: String, required: true },
    },
  ],
  price: { type: Number, required: true },
});

const Product = db.model<ProductDocument>("Product", ProductSchema);

interface ListOptions {
  offset?: number;
  limit?: number;
  tag?: string;
}

async function list(options: ListOptions = {}): Promise<any[]> {
  const { offset = 0, limit = 25, tag } = options;

  const query = tag ? { tags: { $elemMatch: { title: tag } } } : {};

  return Product.find(query).skip(offset).limit(limit);
}

async function get(_id: string): Promise<any> {
  return Product.findById(_id);
}

async function create(fields: Partial<ProductDocument>): Promise<any> {
  return Product.create(fields);
}

async function edit(_id: string, change: Partial<ProductDocument>): Promise<any> {
  const product: any = await get(_id);

  if (!product) return null;

  Object.keys(change).forEach((key) => {
    product[key] = (change as any)[key];
  });

  return product.save();
}

async function remove(_id: string): Promise<any> {
  const product: any = await get(_id);

  if (!product) return null;

  await product.deleteOne();
  return product;
}

export { list, get, create, edit, remove };