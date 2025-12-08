// node-src/src/db.ts
import mongoose from 'mongoose';

const connectionString = process.env.MONGO_CONNECTION_STRING || 'mongodb://localhost:27017/products';

export default {
  connect: () => mongoose.connect(connectionString),
  connection: mongoose.connection,
  Schema: mongoose.Schema,
  model: mongoose.model,
  mongoose
};