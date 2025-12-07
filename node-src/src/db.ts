import mongoose, { Document as MongooseDocument } from 'mongoose';

// Extend mongoose.Document to include any additional properties
export interface Document extends MongooseDocument {
  [key: string]: any;
}

/**
 * In this example we are connecting to a local MongoDB instance. This instance is running via docker-compose in our GitHub Codespaces environment.
 * In a real-world application, you would want to use a cloud-based MongoDB service like MongoDB Atlas.
 */
const mongoUri = process.env.MONGODB_URI || 'mongodb://root:example@db:27017/?authSource=admin';

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Handle connection events
mongoose.connection.on('connected', () => {
  console.log('MongoDB connected successfully');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

export const model = mongoose.model.bind(mongoose);
export const Schema = mongoose.Schema;
export default mongoose;