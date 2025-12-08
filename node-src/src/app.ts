import express from "express";
import cors from "cors";
import morgan from "morgan";
import * as api from "./api";
import { notFound, handleError } from "./middleware";

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(morgan("dev"));

app.get("/health", (_req, res) => res.json({ ok: true }));

// Product routes
app.get("/products", api.listProducts);
app.get("/products/:id", api.getProduct);
app.post("/products", api.createProduct);
app.put("/products/:id", api.editProduct);
app.delete("/products/:id", api.deleteProduct);
// dev-only seed route
app.post("/dev/seed", api.seedProducts);


// Order routes
app.get("/orders", api.listOrders);
app.post("/orders", api.createOrder);

// 404 + error handlers
app.use(notFound);
app.use(handleError);

const PORT = Number(process.env.PORT) || 3001;
app.listen(PORT, () => {
  console.log(`Node API listening on http://localhost:${PORT}`);
});
