import { Request, Response } from "express";
import autoCatch from "./lib/auto-catch";
import * as Products from "./products";
import * as Orders from "./orders";

// GET /products?offset=&limit=&tag=
export const listProducts = autoCatch(async (req: Request, res: Response) => {
  const { offset = "0", limit = "10", tag } = req.query as Record<string, string>;
  const items = await Products.list({
    offset: Number(offset),
    limit: Number(limit),
    tag: tag || undefined
  });
  res.json(items);
});

// GET /products/:id
export const getProduct = autoCatch(async (req: Request, res: Response) => {
  const item = await Products.get(req.params.id);
  if (!item) return res.status(404).json({ error: "Not found" });
  res.json(item);
});

// POST /products
export const createProduct = autoCatch(async (req: Request, res: Response) => {
  const created = await Products.create(req.body);
  res.status(201).json(created);
});

// PUT /products/:id
export const editProduct = autoCatch(async (req: Request, res: Response) => {
  const updated = await Products.edit(req.params.id, req.body);
  res.json(updated);
});

// DELETE /products/:id
export const deleteProduct = autoCatch(async (req: Request, res: Response) => {
  await Products.remove(req.params.id);
  res.status(204).end();
});

// GET /orders
export const listOrders = autoCatch(async (_req: Request, res: Response) => {
  const items = await Orders.list();
  res.json(items);
});

// POST /orders
export const createOrder = autoCatch(async (req: Request, res: Response) => {
  const created = await Orders.create(req.body);
  res.status(201).json(created);
});
// --- DEV SEED (loads data/full-products.json and inserts ~50 items) ---
import path from "path";
import { readFile } from "fs/promises";

export const seedProducts = autoCatch(async (_req: Request, res: Response) => {
  const file = path.join(process.cwd(), "data", "full-products.json");
  const raw = await readFile(file, "utf-8");
  const all = JSON.parse(raw);

  // take first 50 to keep it light
  const toInsert = Array.isArray(all) ? all.slice(0, 50) : [];

  // insert sequentially to avoid overwhelm; duplicates aren’t an issue with cuid ids
  for (const p of toInsert) {
    await Products.create(p);
  }

  res.json({ inserted: toInsert.length });
});
