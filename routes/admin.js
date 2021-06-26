const express = require('express');
const router = express.Router();
const path = require('path');
const rootDir = require('../utils/path')
const addProductController = require('../controllers/controllerAddProduct')
const databaseErrorController =  require('../controllers/controllerDatabaseError')
const products = [];
router.get('/add-product', addProductController.getAddProduct);
router.get('/products', addProductController.getProducts);
router.get('/edit-product', addProductController.editProduct);

router.post('/add-product', addProductController.postAddProduct);
router.post('/delete-product', addProductController.postDeleteProduct);
router.post('/edit-product', addProductController.postEditProduct);

router.get('/unknownError', databaseErrorController.getDatabaseError);

exports.routes = router
