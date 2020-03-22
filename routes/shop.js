const express = require('express');
const Router = express.Router()
const path = require('path');
const rootDir = require('../utils/path')
const adminData = require('../routes/admin.js');
const shopController = require('../controllers/controllerShop.js')
 Router.get('/',shopController.getProducts);

module.exports = Router;