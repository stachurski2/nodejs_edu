const express = require('express');
const Router = express.Router()
const path = require('path');
const rootDir = require('../utils/path')
const adminData = require('../routes/admin.js');

 Router.get('/', (req,res,next) => {   
    const products = adminData.products;
    res.render("shop",{ hasProducts: (products.length > 0),
                        prods: products, 
                        pageTitle: 'Shop',
                        path:'/');
});

module.exports = Router;