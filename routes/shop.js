const express = require('express');
const router = express.Router()
const path = require('path');
const rootDir = require('../utils/path')
const adminData = require('../routes/admin.js');
const shopController = require('../controllers/controllerShop.js');
//const cartController = require('../controllers/controllerCart.js');
const databaseErrorController =  require('../controllers/controllerDatabaseError'); 

 router.get('/', shopController.getIndex);

 router.get('/products', shopController.getProducts);

 router.get('/products/:productId', shopController.getProduct);
 
//  router.get('/cart', cartController.getCart);
  
 router.get('/checkout', shopController.getCheckout);

 router.get('/unknownError', databaseErrorController.getDatabaseError);


module.exports = router;