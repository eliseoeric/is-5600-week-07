
import cuid from 'cuid';
import * as db from './db';


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

interface ProductDocument extends db.Document {
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

// Define our Product Model
const Product = db.model<ProductDocument>('Product', {
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
  tags: [{
    title: { type: String, required: true },
  }],
  price: { type: Number, required: true }, 
});

interface ListOptions {
  offset?: number;
  limit?: number;
  tag?: string;
}

/**
 * List products
 */
async function list(options: ListOptions = {}): Promise<ProductDocument[]> {
  const { offset = 0, limit = 25, tag } = options;

  const query = tag ? {
    tags: {
      $elemMatch: {
        title: tag
      }
    }
  } : {};

  return Product.find(query)
    .skip(offset)
    .limit(limit);
}

/**
 * Get a single product
 */
async function get(_id: string): Promise<ProductDocument | null> {
  return Product.findById(_id);
}

/**
 * Create a product
 */
async function create(fields: Partial<ProductDocument>): Promise<ProductDocument> {
  return Product.create(fields);
}

/**
 * Edit a product
 */
async function edit(_id: string, change: Partial<ProductDocument>): Promise<ProductDocument | null> {
  const product = await get(_id);
  if (!product) return null;
  
  Object.keys(change).forEach(key => {
    product[key] = change[key];
  });
  
  return product.save();
}

/**
 * Delete a product
 */
async function remove(_id: string): Promise<ProductDocument | null> {
  const product = await get(_id);
  if (!product) return null;
  
  await product.remove();
  return product;
}

export {
  list,
  get,
  create,
  edit,
  remove as destroy
};
