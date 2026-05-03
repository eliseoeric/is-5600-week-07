import { Request, Response, NextFunction } from 'express';
import * as path from 'path';
import * as Products from './products';
import * as Orders from './orders';
import autoCatch from './lib/auto-catch';

interface QueryParams {
  offset?: number;
  limit?: number;
  tag?: string;
}

/**
 * Handle the root route
 */
function handleRoot(req: Request, res: Response): void {
  res.sendFile(path.join(__dirname, '../../dist/index.html'));
}

/**
 * List all products
 */
async function listProducts(req: Request, res: Response): Promise<void> {
  const { offset = 0, limit = 25, tag } = req.query as unknown as QueryParams;
  res.json(await Products.list({
    offset: Number(offset),
    limit: Number(limit),
    tag
  }));
}

/**
 * Get a single product
 */
async function getProduct(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
  const { id } = req.params;

  const product = await Products.get(id);
  if (!product) {
    return next();
  }

  return res.json(product);
}

/**
 * Create a product
 */
async function createProduct(req: Request, res: Response): Promise<void> {
  const product = await Products.create(req.body);
  res.json(product);
}

/**
 * Edit a product
 */
async function editProduct(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
  const { id } = req.params;
  const product = await Products.edit(id, req.body);
  if (!product) {
    return next();
  }
  return res.json(product);
}

/**
 * Delete a product
 */
async function deleteProduct(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
  const { id } = req.params;
  const product = await Products.destroy(id);
  if (!product) {
    return next();
  }
  return res.json(product);
}

/**
 * Create an order
 */
async function createOrder(req: Request, res: Response): Promise<void> {
  const order = await Orders.create(req.body);
  res.json(order);
}

/**
 * List all orders
 */
async function listOrders(req: Request, res: Response): Promise<void> {
  const { offset = 0, limit = 25 } = req.query as unknown as QueryParams;
  res.json(await Orders.list({
    offset: Number(offset),
    limit: Number(limit)
  }));
}

export default autoCatch({
  handleRoot,
  listProducts,
  getProduct,
  createProduct,
  editProduct,
  deleteProduct,
  createOrder,
  listOrders
});
