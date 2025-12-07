import mongoose, { Document as MongooseDocument } from 'mongoose';

export interface Document extends MongooseDocument {
  [key: string]: any;
}

mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://root:example@127.0.0.1:27017/?authSource=admin'
).catch(err => console.error('MongoDB connection error:', err.message));

export const model = mongoose.model.bind(mongoose);
export const Schema = mongoose.Schema;
export default mongoose;
