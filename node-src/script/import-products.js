const db = require('../db');
const Products = require('../products');

const products = require('../data/full-products.json');

;(async () => {
  // loop over the products and create them
  for (let i = 0; i < products.length; i++) {
    console.log( await Products.create(products[i]));
  }
})()