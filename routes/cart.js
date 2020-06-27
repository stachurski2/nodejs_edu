const express = require('express');
const router = express.Router()
const path = require('path');
const rootDir = require('../utils/path')
const cartController = require('../controllers/controllerCart.js');

router.post('/addProductToCart', cartController.addProductToCart);

router.get('/getCart', cartController.getCart)

router.post('/removeProductFromCart', cartController.removeProductFromCart)

module.exports = router;