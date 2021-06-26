const express = require('express');
const router = express.Router()
const path = require('path');
const rootDir = require('../utils/path')
const cartController = require('../controllers/controllerCart.js');
const databaseErrorController =  require('../controllers/controllerDatabaseError');

router.post('/addProductToCart', cartController.addProductToCart);

router.get('/getCart', cartController.getCart)

router.post('/removeProductFromCart', cartController.removeProductFromCart)

// router.post('/create-order', cartController.createOrder)

// router.get('/orders', cartController.getOrders)

router.get('/unknownError', databaseErrorController.getDatabaseError);

module.exports = router;