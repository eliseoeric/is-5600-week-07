import { Request, Response, NextFunction } from "express";
import * as path from "path";
import * as Products from "./products";
import * as Orders from "./orders";

// IMPORTANT FIX → use require() because auto-catch.js has no TS types
const autoCatch = require("./lib/auto-catch");

interface QueryParams {
  offset?: number;
  limit?: number;
  tag?: string;
}

/**
 * Handle root /
 */
async function handleRoot(req: Request, res: Response) {
  res.sendFile(path.join(__dirname, "/index.html"));
}

/**
 * List all products with pagination
 */
async function listProducts(req: Request, res: Response) {
  const { offset = 0, limit = 25, tag } = req.query as unknown as QueryParams;

  const products = await Products.list({
    offset: Number(offset),
    limit: Number(limit),
    tag,
  });

  res.json(products);
}

/**
 * Get a single product by ID
 */
async function getProduct(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;

  const product = await Products.get(id);
  if (!product) return next();

  res.json(product);
}

/**
 * Create product
 */
async function createProduct(req: Request, res: Response) {
  const product = await Products.create(req.body);
  res.json(product);
}

/**
 * Edit product
 */
async function editProduct(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;

  const product = await Products.edit(id, req.body);
  if (!product) return next();

  res.json(product);
}

/**
 * Delete product
 */
async function deleteProduct(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;

  const product = await Products.remove(id);
  if (!product) return next();

  res.json(product);
}

/**
 * Create order
 */
async function createOrder(req: Request, res: Response) {
  const order = await Orders.create(req.body);
  res.json(order);
}

/**
 * List orders
 */
async function listOrders(req: Request, res: Response) {
  const { offset = 0, limit = 25 } = req.query as unknown as QueryParams;

  const orders = await Orders.list({
    offset: Number(offset),
    limit: Number(limit),
  });

  res.json(orders);
}

/**
 * Export handlers wrapped in autoCatch()
 */
export default autoCatch({
  handleRoot,
  listProducts,
  getProduct,
  createProduct,
  editProduct,
  deleteProduct,
  createOrder,
  listOrders,
});
