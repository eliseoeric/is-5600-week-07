require("dotenv").config();
const mongoose = require("mongoose");
const MONGO_URL =
  process.env.MONGO_URL ||
  "mongodb://root:example@127.0.0.1:27017/fullstack_prints?authSource=admin";
const productSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    price: Number,
    image: String
  },
  { timestamps: true }
);
const Product = mongoose.model("Product", productSchema);
async function run() {
  await mongoose.connect(MONGO_URL);
  console.log("Connected to MongoDB, seeding products...");
  await Product.deleteMany({});
  const products = [
    {
      name: "Poster A",
      description: "Beautiful Print A",
      price: 10.99,
      image: ""
    },
    {
      name: "Poster B",
      description: "Amazing Print B",
      price: 14.99,
      image: ""
    },
    {
      name: "Poster C",
      description: "Minimalist Print C",
      price: 19.99,
      image: ""
    }
  ];
  await Product.insertMany(products);
  console.log(`Seeded ${products.length} products.`);
  await mongoose.disconnect();
  process.exit(0);
}
run().catch((err) => {
  console.error("Seed error", err);
  process.exit(1);
});
