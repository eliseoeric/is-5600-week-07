import mongoose from 'mongoose';

const DB_URL = process.env.DATABASE_URL || 'mongodb://localhost:27017/fullstack';

const connectDB = async () => {
  try {
    mongoose.connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("✅ MongoDB Connected!");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
    process.exit(1);
  }
};

export default connectDB;
