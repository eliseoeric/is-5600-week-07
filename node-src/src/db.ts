import mongoose from 'mongoose';

mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://root:example@db:27017/test', // make sure DB name is 'test'
  {
    // newer versions of mongoose don’t need useNewUrlParser or useUnifiedTopology
  }
).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));
