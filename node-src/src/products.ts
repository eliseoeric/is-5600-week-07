// node-src/src/products.ts
import cuid from 'cuid';
import db from './db';

const { Schema, model } = db;

// Define the interface
export interface ProductDocument extends db.mongoose.Document {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  likes?: number;
  urls?: any;
  links?: any;
  user?: any;
  tags?: any[];
  createdAt: Date;
  updatedAt: Date;
}

// Define the schema
const productSchema = new Schema<ProductDocument>({
  id: { type: String, default: cuid },
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
  likes: { type: Number, default: 0 },
  urls: { type: Schema.Types.Mixed },
  links: { type: Schema.Types.Mixed },
  user: { type: Schema.Types.Mixed },
  tags: { type: [Schema.Types.Mixed] },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Create the model
const Product = model<ProductDocument>('Product', productSchema);

// Function to get all products
export async function list(limit = 25, offset = 0, tag?: string) {
  const query: any = {};
  if (tag) {
    query.tags = { $elemMatch: { title: tag } };
  }
  
  const products = await Product.find(query)
    .limit(limit)
    .skip(offset)
    .lean()
    .exec() as ProductDocument[];
  
  return products;
}

// Function to get product by ID
export async function get(_id: string) {
  const product = await Product.findOne({ id: _id }).lean().exec();
  return product as ProductDocument | null;
}

// Function to create a product
export async function create(fields: Partial<ProductDocument>) {
  const product = await Product.create(fields);
  return product as ProductDocument;
}

// Function to update a product
export async function update(_id: string, changes: Partial<ProductDocument>) {
  const product = await Product.findOneAndUpdate(
    { id: _id },
    { ...changes, updatedAt: Date.now() },
    { new: true }
  ).lean().exec();
  
  return product as ProductDocument | null;
}

// Function to remove a product
export async function remove(_id: string) {
  const result = await Product.deleteOne({ id: _id });
  return result.deletedCount;
}

export default {
  list,
  get,
  create,
  update,
  remove
};