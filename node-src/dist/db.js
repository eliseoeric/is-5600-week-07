"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Schema = exports.model = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
/**
 * In this example we are connecting to a local MongoDB instance. This instance is running via docker-compose in our GitHub Codespaces environment.
 * In a real-world application, you would want to use a cloud-based MongoDB service like MongoDB Atlas.
 */
mongoose_1.default.connect(process.env.MONGODB_URI || 'mongodb://root:example@db:27017/?authSource=admin', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
exports.model = mongoose_1.default.model.bind(mongoose_1.default);
exports.Schema = mongoose_1.default.Schema;
exports.default = mongoose_1.default;
