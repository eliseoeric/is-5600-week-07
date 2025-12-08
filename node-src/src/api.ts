// node-src/src/api.ts
import express from 'express';
import Products, { ProductDocument } from './products';
import Orders, { OrderDocument, OrderStatus } from './orders';

// Create a simple auto-catch function
const autoCatch = (fn: Function) => {
  return async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

const router = express.Router();

// Products routes
router.get('/products', autoCatch(async (req, res) => {
  const { offset = 0, limit = 25, tag } = req.query;
  const products = await Products.list(
    Number(limit),
    Number(offset),
    tag as string
  );
  res.json(products);
}));

router.get('/products/:id', autoCatch(async (req, res) => {
  const { id } = req.params;
  const product = await Products.get(id);
  
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  
  res.json(product);
}));

router.post('/products', autoCatch(async (req, res) => {
  const product = await Products.create(req.body);
  res.json(product);
}));

router.put('/products/:id', autoCatch(async (req, res) => {
  const { id } = req.params;
  const product = await Products.update(id, req.body);
  
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  
  res.json(product);
}));

router.delete('/products/:id', autoCatch(async (req, res) => {
  const { id } = req.params;
  const deletedCount = await Products.remove(id);
  
  if (!deletedCount) {
    return res.status(404).json({ error: 'Product not found' });
  }
  
  res.json({ success: true });
}));

// Orders routes
router.get('/orders', autoCatch(async (req, res) => {
  const { offset = 0, limit = 25 } = req.query;
  const orders = await Orders.list(Number(limit), Number(offset));
  res.json(orders);
}));

router.get('/orders/:id', autoCatch(async (req, res) => {
  const { id } = req.params;
  const order = await Orders.get(id);
  
  if (!order) {
    return res.status(404).json({ error: 'Order not found' });
  }
  
  res.json(order);
}));

router.post('/orders', autoCatch(async (req, res) => {
  const orderData = {
    ...req.body,
    status: OrderStatus.PENDING
  };
  
  const order = await Orders.create(orderData);
  res.status(201).json(order);
}));

router.patch('/orders/:id/status', autoCatch(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  
  if (!Object.values(OrderStatus).includes(status)) {
    return res.status(400).json({ error: 'Invalid status' });
  }
  
  const order = await Orders.updateStatus(id, status);
  
  if (!order) {
    return res.status(404).json({ error: 'Order not found' });
  }
  
  res.json(order);
}));

export default router;