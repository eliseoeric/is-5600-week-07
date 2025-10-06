import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
const app = express();
app.use(cors());
app.use(express.json());
const PORT = Number(process.env.PORT) || 3080;
const dataPath = path.join(process.cwd(), "data", "full-products.json");
app.get("/products", (_req, res) => {
  try { res.json(JSON.parse(fs.readFileSync(dataPath, "utf-8"))); }
  catch { res.status(500).json({ error: "failed to load products" }); }
});
app.get("/products/:id", (req, res) => {
  try {
    const items = JSON.parse(fs.readFileSync(dataPath, "utf-8"));
    const id = String(req.params.id);
    const item = items.find((p: any) => String(p._id ?? p.id) === id);
    if (!item) return res.status(404).json({ error: "not found" });
    res.json(item);
  } catch { res.status(500).json({ error: "failed to load product" }); }
});
app.listen(PORT, "0.0.0.0", () => console.log(`API listening on ${PORT}`));
