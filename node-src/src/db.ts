import mongoose, { Document as MongooseDocument } from 'mongoose';

export interface Document extends MongooseDocument {
  [key: string]: any;
}

mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce'
);

export const model = mongoose.model.bind(mongoose);
export const Schema = mongoose.Schema;
export default mongoose;
