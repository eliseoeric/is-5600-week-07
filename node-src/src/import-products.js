// Import script - save this as 'import-products.js' in your Node project

const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/fullstack-prints', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Define the Product schema - this should match your existing model
const productSchema = new mongoose.Schema({
  _id: String,
  description: String,
  alt_description: String,
  user: {
    first_name: String,
    last_name: String,
    instagram_username: String,
    profile_image: {
      medium: String
    }
  },
  urls: {
    small: String,
    regular: String
  },
  likes: Number,
  price: Number,
  tags: [{
    title: String
  }]
});

// Create a Product model
const Product = mongoose.model('Product', productSchema);

// Load the JSON data
const productsData = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'node-src/data/full-products.json'), 'utf8')
);

// Add a price field to each product if it doesn't exist
const productsWithPrice = productsData.map(product => {
  if (!product.price) {
    // Generate a random price between $10 and $100
    const price = Math.floor(Math.random() * 90) + 10;
    return { ...product, price };
  }
  return product;
});

// Import the data to MongoDB
async function importData() {
  try {
    // Remove any existing products
    await Product.deleteMany({});
    
    // Insert the new products
    await Product.insertMany(productsWithPrice);
    
    console.log('Data successfully imported!');
    mongoose.connection.close();
  } catch (error) {
    console.error('Error importing data:', error);
    mongoose.connection.close();
  }
}

importData();