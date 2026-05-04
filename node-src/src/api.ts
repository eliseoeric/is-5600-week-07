import { Request, Response, NextFunction } from "express";
import * as path from "path";
import * as Products from "./products";
import * as Orders from "./orders";

// =====================
// ROOT
// =====================
export const handleRoot = (req: Request, res: Response): void => {
  res.json({ message: "API running" });
};

// =====================
// PRODUCTS
// =====================

export const listProducts = async (req: Request, res: Response): Promise<void> => {
  const products = await Products.list({});
  res.json(products);
};

export const getProduct = async (req: Request, res: Response, next: NextFunction) => {
  const product = await Products.get(req.params.id);

  if (!product) return next();

  res.json(product);
};

export const createProduct = async (req: Request, res: Response) => {
  const product = await Products.create(req.body);
  res.json(product);
};

export const editProduct = async (req: Request, res: Response, next: NextFunction) => {
  const product = await Products.edit(req.params.id, req.body);

  if (!product) return next();

  res.json(product);
};

export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
  const product = await Products.remove(req.params.id);

  if (!product) return next();

  res.json(product);
};

// =====================
// ORDERS
// =====================

export const createOrder = async (req: Request, res: Response) => {
  const order = await Orders.create(req.body);
  res.json(order);
};

export const listOrders = async (req: Request, res: Response) => {
  const orders = await Orders.list({});
  res.json(orders);
};