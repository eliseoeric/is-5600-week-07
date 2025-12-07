"use strict";
mongoose.connect(process.env.MONGODB_URI || 'mongodb://root:example@db:27017/products-db?authSource=admin');
