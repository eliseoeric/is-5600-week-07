"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/db.ts
const mongoose_1 = __importDefault(require("mongoose"));
const mongodb_memory_server_1 = require("mongodb-memory-server");
async function connect() {
    try {
        // If you have a real Mongo URL, set it via env MONGO_URL
        let uri = process.env.MONGO_URL;
        if (!uri) {
            const mongod = await mongodb_memory_server_1.MongoMemoryServer.create();
            uri = mongod.getUri();
            console.log("[db] Started in-memory MongoDB");
        }
        await mongoose_1.default.connect(uri);
        console.log("[db] Connected:", uri);
    }
    catch (err) {
        console.error("[db] Connection error:", err);
    }
}
connect();
exports.default = mongoose_1.default;
