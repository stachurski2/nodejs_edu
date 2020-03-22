const express = require('express');
const router = express.Router();
const path = require('path');
const rootDir = require('../utils/path')
const addProductController = require('../controllers/controllerAddProduct')

const products = [];
router.get('/add-product', addProductController.getAddProduct);

router.post('/add-product', addProductController.postAddProduct);

exports.routes = router
