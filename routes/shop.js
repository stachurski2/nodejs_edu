const express = require('express');
const Router = express.Router()
const path = require('path');
const rootDir = require('../utils/path')
const adminData = require('../routes/admin.js');

 Router.get('/', (req,res,next) => {   
    const products = adminData.products;
    res.render("shop",{ products, docTitle: 'Shop' });
});


module.exports = Router;