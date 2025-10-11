const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const app = express();
app.use(cors());
app.use(express.json());
const PORT = 3090;
const dataPath = path.join(__dirname, "data", "full-products.json");
app.get("/", (_req,res)=>res.send("API OK. Try /products"));
app.get("/products", (_req, res) => {
  try { res.json(JSON.parse(fs.readFileSync(dataPath, "utf-8"))); }
  catch (e) { console.error(e); res.status(500).json({ error: "failed to load products" }); }
});
app.get("/products/:id", (req, res) => {
  try {
    const items = JSON.parse(fs.readFileSync(dataPath, "utf-8"));
    const id = String(req.params.id);
    const item = items.find(p => String(p._id ?? p.id) === id);
    if (!item) return res.status(404).json({ error: "not found" });
    res.json(item);
  } catch (e) { console.error(e); res.status(500).json({ error: "failed to load product" }); }
});
app.listen(PORT, "0.0.0.0", () => console.log(`API listening on ${PORT}`));
