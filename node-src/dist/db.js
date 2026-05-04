"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Schema = exports.model = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce');
exports.model = mongoose_1.default.model.bind(mongoose_1.default);
exports.Schema = mongoose_1.default.Schema;
exports.default = mongoose_1.default;