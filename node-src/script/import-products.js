// node-src/scripts/import-products.js
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Import the Products model
const Products = require('../dist/products').default;

const productsData = require('../data/full-products.json');

async function importProducts() {
  try {
    console.log('Starting product import...');
    
    for (const product of productsData) {
      // Transform the data if needed
      const productData = {
        id: product.id || product._id,
        name: product.name || product.description?.substring(0, 50) || 'Unknown Product',
        description: product.description || 'No description available',
        price: product.price || Math.floor(Math.random() * 100) + 10,
        image: product.image || product.urls?.thumb || 'https://via.placeholder.com/150',
        category: product.category || 'general',
        likes: product.likes || 0,
        urls: product.urls,
        links: product.links,
        user: product.user,
        tags: product.tags
      };
      
      await Products.create(productData);
      console.log(`Imported product: ${productData.name}`);
    }
    
    console.log('Product import completed successfully!');
  } catch (error) {
    console.error('Error importing products:', error);
  }
}

// Run the import
importProducts();