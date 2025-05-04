import mongoose, { Document as MongooseDocument } from 'mongoose';
const url = 'mongodb://root:example@db:27017';

// Extend mongoose.Document to include any additional properties
export interface Document extends MongooseDocument {
  [key: string]: any;
}

/**
 * In this example we are connecting to a local MongoDB instance. This instance is running via docker-compose in our GitHub Codespaces environment.
 * In a real-world application, you would want to use a cloud-based MongoDB service like MongoDB Atlas.
 */
mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://root:example@db:27017/?authSource=admin',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

export const model = mongoose.model.bind(mongoose);
export const Schema = mongoose.Schema;
export default mongoose;
