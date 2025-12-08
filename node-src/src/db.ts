// src/db.ts
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

async function connect() {
  try {
    // If you have a real Mongo URL, set it via env MONGO_URL
    let uri = process.env.MONGO_URL;

    if (!uri) {
      const mongod = await MongoMemoryServer.create();
      uri = mongod.getUri();
      console.log("[db] Started in-memory MongoDB");
    }

    await mongoose.connect(uri);
    console.log("[db] Connected:", uri);
  } catch (err) {
    console.error("[db] Connection error:", err);
  }
}

connect();

export default mongoose;
